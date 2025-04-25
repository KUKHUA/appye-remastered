const OPFS_ROOT_DIR_NAME = "root";
const OPFS_PREFIX = `/${OPFS_ROOT_DIR_NAME}/`;

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

  if (url.pathname.startsWith(OPFS_PREFIX)) {
    event.respondWith(
      handleRootRequestFromOPFS(event.request).catch((error) => {
        if (error.name === "NotFoundError") {
          console.warn(
            `[SW Info] File not found in OPFS: ${url.pathname}. Falling back to network fetch.`
          );
          return fetch(event.request);
        } else {
          console.error(
            `[SW OPFS Error] Failed to handle OPFS request for ${url.pathname}:`,
            error
          );
          return new Response("Server error handling OPFS request", {
            status: 500,
            statusText: "Internal Server Error",
          });
        }
      })
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});

async function handleRootRequestFromOPFS(request) {
  const url = new URL(request.url);
  const relativePath = decodeURIComponent(
    url.pathname.substring(OPFS_PREFIX.length)
  );

  if (!relativePath || relativePath.endsWith("/")) {
    console.log(
      `INFO: Denying request for OPFS directory or invalid path: ${url.pathname}`
    );

    const error = new Error("Directory listing or invalid path not supported");
    error.name = "ForbiddenPathError";

    throw error;
  }

  const opfsRoot = await navigator.storage.getDirectory();
  const rootDirHandle = await opfsRoot.getDirectoryHandle(OPFS_ROOT_DIR_NAME, {
    create: false,
  });
  const parts = relativePath.split("/").filter((part) => part.length > 0);

  if (parts.length === 0) {
    const error = new Error("Invalid empty path after filtering");
    error.name = "InvalidPathError";
    throw error;
  }

  let currentHandle = rootDirHandle;

  for (let i = 0; i < parts.length - 1; i++) {
    currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
  }

  const fileName = parts[parts.length - 1];

  const fileHandle = await currentHandle.getFileHandle(fileName);

  const file = await fileHandle.getFile();
  const contentType = file.type || "application/octet-stream";

  console.log(
    `INFO: Serving OPFS file: ${url.pathname} (Size: ${file.size}, Type: ${contentType})`
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
