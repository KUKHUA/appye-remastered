class clientResources{
    #pageContext;
    #fileSystem;
    folders;
    config;
    #indexedFolders;
    #indexedConfigs;

    constructor(pageContext){
        this.#pageContext = pageContext;
        this.#fileSystem = new OPFSFileSystem("root");
        this.#indexedFolders;
        this.#indexedConfigs;

        this.folders = {};
        this.config = {};

        if(!pageContext)
            this.#pageContext = document;
    }

    async init(){
        await this.#fileSystem.init();
        
        this.config['system'] = new config("fileSystem/system.json",this.#fileSystem);
        await this.config['system'].init();
        
        this.#indexedFolders = this.config['system']?.get("clientResources")["indexedFolders"];
        this.#indexedConfigs = this.config['system'].get("clientResources")["indexedConfigs"];

        await this.#buildFolders();
        await this.#buildConfigs();
    }

    async #buildFolders(){
        try {
            this.#indexedFolders.forEach(async folder => {
                this.folders[folder.name] = await this.#fileSystem.getFolder(folder.path);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async #buildConfigs(){
        try {
            this.#indexedConfigs.forEach(async conf => {
                this.config[config.name] = new config(config.path,this.#fileSystem);
                await this.config[config.name].init();
            });
        } catch (error) {
            console.log(error);
        }
    }

}

class config{
    constructor(path,fileSystem){
        this.fileSystem = fileSystem;
        this.path = path;
        this.config;
    }

    async init(){
        this.config = await this.fileSystem.getFile(this.path);
        this.config = await this.config.json();
    }

    get(key){
        return this.config[key];
    }

    getAll(){
        return this.config;
    }

    overwrite(config){
        this.config = config;
    }

    set(key,value){
        this.config[key] = value;
    }

    async save(){
        await this.fileSystem.createFile(this.path,JSON.stringify(this.config));
    }

    async reload(){
        await this.init();
    }
}