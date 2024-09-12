self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("mealprep-cache").then((cache) => {
      return cache.addAll(["/", "/index.html", "/offline.html"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match("/offline.html");
    })
  );
});
