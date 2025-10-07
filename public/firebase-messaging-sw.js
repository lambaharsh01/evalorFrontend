// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyDGGrstRaHn44IGLvGwZbbaFImJuCaijQQ",
    authDomain: "ping-folio-123.firebaseapp.com",
    projectId: "ping-folio-123",
    storageBucket: "ping-folio-123.firebasestorage.app",
    messagingSenderId: "299089530015",
    appId: "1:299089530015:web:28dab13ea41e36f46466aa"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);

    const { notification = {}, data = {} } = payload;

    const title = notification.title || data.title || "PingFolio";
    const body = notification.body || data.body || "You have a new notification";
    const icon = notification.icon || data.icon || "/icons/android-chrome-192x192.png";
    const badge = "/icons/android-chrome-192x192.png";

    const notificationOptions = {
        body,
        icon,
        badge,
        tag: 'pingfolio-notification', // Consistent tag
        requireInteraction: false, // Changed to false for better mobile experience
        silent: false,
        vibrate: [200, 100, 200], // Mobile vibration pattern
        data: {
            click_action: data.click_action || "/",
            timestamp: Date.now(),
            ...data
        },
        actions: [
            { action: 'open', title: 'Open App' },
            { action: 'dismiss', title: 'Dismiss' }
        ]
    };

    return self.registration.showNotification(title, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('Notification click received:', event);

    event.notification.close();

    const action = event.action;
    const clickAction = event.notification.data?.click_action || '/';

    if (action === 'dismiss') {
        return; // Just close the notification
    }

    event.waitUntil(
        self.clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(clients => {
            // Check if app is already open
            const existingClient = clients.find(client =>
                client.url.startsWith(self.location.origin) &&
                client.visibilityState === 'visible'
            );

            if (existingClient) {
                // Focus existing window and navigate if needed
                existingClient.focus();
                if (clickAction !== '/' && 'navigate' in existingClient) {
                    return existingClient.navigate(clickAction);
                }
                return existingClient;
            } else {
                // Open new window
                const url = clickAction.startsWith('http')
                    ? clickAction
                    : self.location.origin + clickAction;
                return self.clients.openWindow(url);
            }
        }).catch(err => {
            console.error('Error handling notification click:', err);
        })
    );
});

// Handle push events (fallback)
self.addEventListener('push', (event) => {
    console.log('Push event received:', event);

    if (!event.data) {
        return;
    }

    try {
        const payload = event.data.json();
        const title = payload.notification?.title || "PingFolio";
        const options = {
            body: payload.notification?.body || "New notification",
            icon: "/icons/android-chrome-192x192.png",
            badge: "/icons/android-chrome-192x192.png",
            tag: 'pingfolio-push',
            data: payload.data || {}
        };

        event.waitUntil(
            self.registration.showNotification(title, options)
        );
    } catch (error) {
        console.error('Error parsing push data:', error);
    }
});

// Service worker install/activate events
self.addEventListener('install', () => {
    console.log('Service Worker installing');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating');
    event.waitUntil(self.clients.claim());
});