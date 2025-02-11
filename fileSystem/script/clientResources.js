document.addEventListener("DOMContentLoaded",async function(){
    window.clientResources = new clientResources("fileSystem/system/classes/classLoader.js",document);
    await window.clientResources.init();
});

class clientResources{

    #classLoader;
    #pageContext;
    #fileSystem;
    folders;
    config;
    #indexedFolders;
    #indexedConfigs;

    constructor(classLoader,pageContext){
        this.#classLoader = classLoader;
        this.#pageContext = pageContext;
        this.#fileSystem = new OPFSFileSystem("root");
        this.#indexedFolders;
        this.#indexedConfigs;

        this.folders = {};
        this.config = {};

        if(!(classLoader instanceof URL))
            this.#classLoader = new URL(classLoader);
        if(!pageContext)
            this.#pageContext = document;
    }

    async init(){
        let classLoader = this.#pageContext.createElement("script");
        classLoader.src = this.#classLoader.href;
        classLoader.id = "classLoader";
        this.#pageContext.head.appendChild(classLoader);

        this.config['system'] = new config("fileSystem/system.json",this.#fileSystem);
        await this.config['system'].init();

        this.#indexedFolders = this.config['system'].get("indexedFolders");
        this.#indexedConfigs = this.config['system'].get("indexedConfigs");

        await this.#buildFolders();
        await this.#buildConfigs();
    }

    async #buildFolders(){
        try {
            this.#indexedFolders.forEach(async folder => {
                this.folders[folderName] =  this.#fileSystem.getFolder(folder.path);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async #buildConfigs(){
        try {
            this.#indexedConfigs.forEach(async config => {
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