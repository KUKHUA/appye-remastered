class Config {
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
