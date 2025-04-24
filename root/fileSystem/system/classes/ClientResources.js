class ClientResources {
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

    this.config["system"] = new Config(
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

    // loads apps from system.autoload.apps
    let loadDeezApps = this.config["system"]?.get("autoLoad");
    loadDeezApps = loadDeezApps?.apps || [];
    for (const app of loadDeezApps) {
      this.openApp(app);
    }
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
          const configInstance = new Config(conf.path, this.#fileSystem);
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
      } else if (appTarget?.type === "javascript" && appTarget.url) {
        const script = document.createElement("script");
        script.src = appTarget.url;

        script.onload = () => {
          console.log(`App '${appName}' loaded successfully.`);
        };

        script.onerror = () => {
          console.error(
            `${appName} failed to load. Script URL: ${appTarget.url}`
          );
        };

        this.#pageContext.head.appendChild(script);
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
