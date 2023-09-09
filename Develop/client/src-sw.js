const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
 cacheName: "page-cache",
 plugins: [
  new CacheableResponsePlugin({
   statuses: [0, 200],
  }),
  new ExpirationPlugin({
   maxAgeSeconds: 30 * 24 * 60 * 60,
  }),
 ],
});

warmStrategyCache({
 urls: ["/index.html", "/"],
 strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Implement asset caching
registerRoute(
 // Define a route for caching assets (e.g., JS, CSS, images)
 // You should customize this route to match your asset URLs
 ({ request }) =>
  request.destination === "script" ||
  request.destination === "style" ||
  request.destination === "image",
 // Use a suitable caching strategy for assets (e.g., CacheFirst)
 new CacheFirst({
  cacheName: "assets-cache",
  plugins: [
   // Customize cache settings as needed
   new CacheableResponsePlugin({
    statuses: [0, 200],
   }),
   new ExpirationPlugin({
    maxAgeSeconds: 7 * 24 * 60 * 60, // Adjust the caching duration as needed
   }),
  ],
 })
);
