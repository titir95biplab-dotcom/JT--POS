// Import Firebase libraries for Service Worker
importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js');

// 1. Initialize Firebase (Paste your SAME config here)
firebase.initializeApp({
    apiKey: "AIzaSyCbHeWurSgxdE1cYFvTGsoyzpK7PQ_1Z0o", 
    authDomain: "jt-s-pos.firebaseapp.com",
    projectId: "jt-s-pos",
    storageBucket: "jt-s-pos.firebasestorage.app",
    messagingSenderId: "365172962139",
    appId: "1:365172962139:web:eaad048f98d2af1ff8207e"
});

// 2. Initialize Messaging
const messaging = firebase.messaging();

// 3. Background Message Handler
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png', // Ensure this path is correct
    image: payload.notification.image || null // Supports Images!
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


// --- STANDARD PWA CACHING (Keep your existing logic) ---
const CACHE_NAME = 'jt-pos-v31';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});




