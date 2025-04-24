self.addEventListener("fetch", (event) => {
  console.log(`INFO: Fetch event triggered for URL: ${event.request.url}`);
  if (event.request.url.includes("/root/")) {
    console.log("INFO: URL includes /root/, handling request with OPFS.");
    event.respondWith(handleRootRequestFromOPFS(event.request));
  } else {
    console.log("INFO: URL does not include /root/, fetching normally.");
    event.respondWith(fetch(event.request));
  }
});

async function handleRootRequestFromOPFS(event) {
  try {
    console.info("Entering handleRootRequestFromOPFS function.");
    const rootHandle = await navigator.storage.getDirectory();
    console.info("Successfully obtained root directory handle.");

    const url = new URL(event.request.url);
    const path = url.pathname.split("/root/")[1];
    console.info(`Extracted path from URL: ${path}`);

    const parts = path.split("/");
    console.info(`Split path into parts: ${parts}`);

    let currentDir = rootHandle;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      console.info(`Navigating to directory: ${part}`);
      currentDir = await currentDir.getDirectoryHandle(part);
    }

    const fileHandle = await currentDir.getFileHandle(parts.at(-1));
    const file = await fileHandle.getFile();
    const contents = await file.text();

    return new Response(contents, {
      headers: { "Content-Type": "application/javascript" },
    });
  } catch (e) {
    console.warn(`OPFS failed for path. Falling back to network fetch.`, e);
    return fetch(event.request);
  }
}
