class installer{
    constructor(){
        this.mirror = new URL("https://raw.githack.com/KUKHUA/appye-remastered/main/");
        this.fileSystem = new OPFSFileSystem("root");
        this.fileList = new URL("files.json", this.mirror);
    }

    async install(){
        await this.fileSystem.init();
        this.fileList = await fetch(this.fileList);
        this.fileList = await this.fileList.json();
        this.fileList.files.forEach(async element => {
            let fileURL = this.mirror.href + element;
            console.log(fileURL);
            let fileBlob = fetch(fileURL);
            fileBlob = await fileBlob;
            fileBlob = await fileBlob.blob();
            await this.fileSystem.createFile(element, fileBlob);
        });
        await this.addServiceWorker();
    }

    isInstalled(){
        return this.fileSystem.hasFile("fileSystem/system.json");
    }

    async addServiceWorker(){
        if('serviceWorker' in navigator){
            navigator.serviceWorker.register('fileSystem/script/serviceWorker.js');
        }
    }
}