self.addEventListener('fetch', event => {
    console.log(`INFO: Fetch event triggered for URL: ${event.request.url}`);
    if (event.request.url.includes('/root/')) {
        console.log('INFO: URL includes /root/, handling request with OPFS.');
        event.respondWith(
            handleRootRequestFromOPFS(event.request)
        );
    } else {
        console.log('INFO: URL does not include /root/, fetching normally.');
        event.respondWith(fetch(event.request));
    }
});

async function handleRootRequestFromOPFS(request) {
    console.log('INFO: Entering handleRootRequestFromOPFS function.');
    let path = '';
    try {
        console.log('INFO: Attempting to get the root directory handle.');
        let fs = await navigator.storage.getDirectory();
        console.log('INFO: Successfully obtained root directory handle.');
        
        fs = fs.getDirectoryHandle('root');
        console.log('INFO: Navigated to "root" directory.');

        let url = new URL(request.url);
        path = url.pathname;
        path = path.substring(path.indexOf('/root/') + 6);
        console.log(`INFO: Extracted path from URL: ${path}`);
        
        let parts = path.split('/');
        console.log(`INFO: Split path into parts: ${parts.join(', ')}`);
        
        let currentDir = fs;
        for (let i = 0; i < parts.length - 1; i++) {
            console.log(`INFO: Navigating to directory: ${parts[i]}`);
            currentDir = await currentDir.getDirectoryHandle(parts[i]);
        }
        
        console.log(`INFO: Attempting to get file handle for: ${parts[parts.length - 1]}`);
        let fileHandle = await currentDir.getFileHandle(parts[parts.length - 1]);
        console.log('INFO: Successfully obtained file handle.');

        let file = await fileHandle.getFile();
        console.log(`INFO: Successfully obtained file. File type: ${file.type}, File size: ${file.size} bytes.`);
        
        let response = new Response(file, {
            headers: {
                'Content-Type': file.type
            }
        });
        console.log('INFO: Successfully created response object.');
        return response;
    } catch (e) {
        console.error(`ERROR: Unable to find file at path ${path}. Full error: ${e}`);
        let response = new Response(`Unable to find file at path ${path}, full error is ${e}`, {
            status: 404,
            statusText: 'Not Found'
        });
        return response;
    }
}