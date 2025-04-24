self.addEventListener("fetch", (event) => {
  console.log(`INFO: Fetch event triggered for URL: ${event.request.url}`);
  if (
    event.request.url.includes("/root/") &&
    !event.request.url.includes("raw.githack.com")
  ) {
    console.log("INFO: URL includes /root/, handling request with OPFS.");
    event.respondWith(handleRootRequestFromOPFS(event.request));
  } else {
    console.log("INFO: URL does not include /root/, fetching normally.");
    event.respondWith(fetch(event.request));
  }
});

async function handleRootRequestFromOPFS(request) {
  console.log("INFO: Entering handleRootRequestFromOPFS function.");
  let path = "";
  try {
    const fs = await navigator.storage.getDirectory();

    const url = new URL(request.url);
    path = url.pathname.substring(url.pathname.indexOf("/root/") + 6);
    const parts = path.split("/");

    let currentDir = fs;
    for (let i = 0; i < parts.length - 1; i++) {
      currentDir = await currentDir.getDirectoryHandle(parts[i], {
        create: true,
      });
    }

    const fileName = parts[parts.length - 1];
    try {
      // Try to get the file from OPFS
      const fileHandle = await currentDir.getFileHandle(fileName);
      const file = await fileHandle.getFile();
      console.log("INFO: Successfully served file from OPFS.");
      return new Response(file, {
        headers: { "Content-Type": file.type },
      });
    } catch (opfsError) {
      console.warn(
        `WARN: File not found in OPFS, fetching from network: ${path}`
      );

      // Fetch from network
      const networkResponse = await fetch(request);

      if (!networkResponse.ok)
        throw new Error(
          `Network request failed with status ${networkResponse.status}`
        );

      // Clone response to use in OPFS and for serving
      const responseClone = networkResponse.clone();
      const blob = await responseClone.blob();

      const fileHandle = await currentDir.getFileHandle(fileName, {
        create: true,
      });
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
      console.log(`INFO: Fetched and saved file to OPFS: ${path}`);

      return networkResponse;
    }
  } catch (e) {
    console.error(
      `ERROR: Unable to handle request for path ${path}. Full error: ${e}`
    );
    return new Response(`Unable to retrieve file: ${e}`, {
      status: 404,
      statusText: "Not Found",
    });
  }
}
