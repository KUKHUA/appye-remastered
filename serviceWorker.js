const OPFS_ROOT_DIR_NAME = "root"; // Root directory name
const OPFS_PREFIX = "/root/"; // The portion of the URL that marks the start of the directory structure

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Check if the URL path contains "/root/"
  if (url.pathname.includes(OPFS_PREFIX)) {
    event.respondWith(
      handleRequestFromOPFS(event.request).catch((error) => {
        event.respondWith(fetch(event.request));
      }),
    );
  }
});

async function handleRequestFromOPFS(request) {
  const url = new URL(request.url);

  // Strip everything before "/root/" and get the remaining path
  let relativePath = url.pathname.substring(
    url.pathname.indexOf(OPFS_PREFIX) + OPFS_PREFIX.length,
  );

  // If the path is empty or a directory (ends with "/"), return an error
  if (!relativePath || relativePath.endsWith("/")) {
    console.log(
      `INFO: Denying request for OPFS directory or invalid path: ${url.pathname}`,
    );

    const error = new Error("Directory listing or invalid path not supported");
    error.name = "ForbiddenPathError";

    throw error;
  }

  // Get the OPFS root directory handle
  const opfsRoot = await navigator.storage.getDirectory();
  const rootDirHandle = await opfsRoot.getDirectoryHandle(OPFS_ROOT_DIR_NAME, {
    create: false,
  });

  // Split the relative path by '/' and remove any empty parts
  const parts = relativePath.split("/").filter((part) => part.length > 0);

  // If there are no parts left, throw an error
  if (parts.length === 0) {
    const error = new Error("Invalid empty path after filtering");
    error.name = "InvalidPathError";
    throw error;
  }

  let currentHandle = rootDirHandle;

  // Traverse through the directory structure using the parts
  for (let i = 0; i < parts.length - 1; i++) {
    currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
  }

  const fileName = parts[parts.length - 1];

  // Retrieve the file handle and then serve the file
  const fileHandle = await currentHandle.getFileHandle(fileName);
  const file = await fileHandle.getFile();
  const contentType = file.type || "application/octet-stream";

  console.log(
    `INFO: Serving OPFS file: ${url.pathname} (Size: ${file.size}, Type: ${contentType})`,
  );

  return new Response(file, {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": contentType,
      "Content-Length": file.size,
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
