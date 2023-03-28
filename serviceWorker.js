const staticDevCat = "dev-cat-site-v1"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/js/main.js",
  "/images/cats.webp",
  "/images/fish.webp",
  "/images/water.webp",
  "/images/landscape.webp",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCat).then(cache => {
      cache.addAll(assets)
    })
  )
})
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })