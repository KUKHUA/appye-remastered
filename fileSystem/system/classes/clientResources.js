class clientResources {
  #pageContext;
  #fileSystem;
  folders;
  config;
  #indexedFolders;
  #indexedConfigs;

  constructor(pageContext) {
    this.#pageContext = pageContext || document; // Simplified assignment
    this.#fileSystem = new OPFSFileSystem("root");
    // No need to initialize #indexedFolders/#indexedConfigs here
    this.folders = {};
    this.config = {};
  }

  async init() {
    await this.#fileSystem.init();

    this.config["system"] = new config(
      "fileSystem/system.json",
      this.#fileSystem
    );
    await this.config["system"].init();

    // Add checks to ensure config values exist before accessing properties
    const clientResourcesConfig = this.config["system"]?.get("clientResources");
    this.#indexedFolders = clientResourcesConfig?.["indexedFolders"] || [];
    this.#indexedConfigs = clientResourcesConfig?.["indexedConfigs"] || [];

    // Wait for all folders and configs to be built
    await Promise.all([this.#buildFolders(), this.#buildConfigs()]);
  }

  async #buildFolders() {
    try {
      // Use Promise.all with map
      await Promise.all(
        this.#indexedFolders.map(async (folder) => {
          this.folders[folder.name] = await this.#fileSystem.getFolder(
            folder.path
          );
        })
      );
    } catch (error) {
      console.error("Error building folders:", error); // Log error specifically
    }
  }

  async #buildConfigs() {
    try {
      // Use Promise.all with map
      await Promise.all(
        this.#indexedConfigs.map(async (conf) => {
          // Use the loop variable 'conf' instead of the class 'config'
          const configInstance = new config(conf.path, this.#fileSystem);
          await configInstance.init();
          this.config[conf.name] = configInstance; // Assign after init
        })
      );
    } catch (error) {
      console.error("Error building configs:", error); // Log error specifically
    }
  }

  openApp(appName) {
    try {
      // Check if appList config exists and the appName exists within it
      const appListConfig = this.config["appList"];
      const appTarget = appListConfig?.get(appName);

      // Check if appTarget exists and has the required properties
      if (appTarget?.type === "embed" && appTarget.url && appTarget.name) {
        new WinBox({
          title: appTarget.name,
          url: appTarget.url,
          width: appTarget.width, // Consider default values if properties might be missing
          height: appTarget.height,
          color: appTarget.color,
          icon: appTarget.icon,
          class: appTarget.class,
        });
      } else if (appTarget) {
        console.warn(
          `App '${appName}' found but missing required properties or is not of type 'embed'.`
        );
      } else {
        console.warn(`App '${appName}' not found in appList config.`);
      }
    } catch (error) {
      console.error(`Error opening app '${appName}':`, error); // Log error specifically
    }
  }
}

class config {
  constructor(path, fileSystem) {
    this.fileSystem = fileSystem;
    this.path = path;
    this.config = null; // Initialize to null
  }

  async init() {
    try {
      // Add try-catch for file operations
      const file = await this.fileSystem.getFile(this.path);
      if (file) {
        // Check if file was retrieved
        this.config = await file.json();
      } else {
        console.error(`Config file not found at path: ${this.path}`);
        this.config = {}; // Initialize to empty object on error
      }
    } catch (error) {
      console.error(`Error initializing config from ${this.path}:`, error);
      this.config = {}; // Initialize to empty object on error
    }
  }

  get(key) {
    // Add check if config is initialized
    return this.config?.[key];
  }

  getAll() {
    return this.config;
  }

  overwrite(newConfig) {
    // Renamed parameter for clarity
    this.config = newConfig;
  }

  set(key, value) {
    if (this.config) {
      // Check if config is initialized
      this.config[key] = value;
    } else {
      console.error("Cannot set value, config not initialized.");
    }
  }

  async save() {
    if (!this.config) {
      console.error("Cannot save, config not initialized.");
      return;
    }
    try {
      // Add try-catch for file operations
      await this.fileSystem.createFile(
        this.path,
        JSON.stringify(this.config, null, 2)
      ); // Added pretty print
    } catch (error) {
      console.error(`Error saving config to ${this.path}:`, error);
    }
  }

  async reload() {
    await this.init(); // Re-initializes using the same error handling
  }
}
