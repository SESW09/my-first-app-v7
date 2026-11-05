// 서비스 워커 파일: 필수 에셋을 캐싱해 빠른 실행을 보조합니다.
const CACHE_NAME = "study-helper-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  // 구글 스크립트 통신은 캐시하지 않고 항상 네트워크로 통신
  if (event.request.url.includes("script.google.com")) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});