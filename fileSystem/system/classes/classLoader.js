class loadStuff {
    constructor(classes,pageContext){
        this.classes = classes;
        this.classElements = [];

        if(!pageContext)
            this.pageContext = document;
        else
            this.pageContext = pageContext;

        
    }

    async loadClasses(){
        this.classes.forEach(async element => {
            let isExternal = false;
            if(element.includes("http"))
                isExternal = true;

            if(element.includes(".js"))
                await this.loadScript(element,isExternal);
            else if(element.includes(".css"))
                await this.loadStyle(element,isExternal);

        });
    }
    
    async loadScript(url,isExternal){
        let script = this.pageContext.createElement("script");
        script.src = url;
        script.id = url.split("/").pop();
        this.pageContext.head.appendChild(script);
    }

    async loadStyle(url,isExternal){
        let style = this.pageContext.createElement("link");
        style.href = url;
        style.rel = "stylesheet";
        style.id = url.split("/").pop();
        this.pageContext.head.appendChild(style);
    }

}