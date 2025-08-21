// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { 
  getMessaging, 
  getToken, 
  onMessage, 
} from "firebase/messaging";
import type {  Messaging, MessagePayload} from "firebase/messaging"
import { v4 as uuidv4 } from "uuid";

import { Capacitor } from "@capacitor/core";

import type { firebaseConfigParameters, platform, tokenRequestResult } from "./types";
import { requestWebToken } from "./platformToken";

const VAPID_KEY = "BFAH7N8ASi-DheZn5SaN9-JI2eV9bg52VBItfjwnZQwr0DZDwj9SXtqzVNRFXvTp97o3_x8SSBtCpdsdIo4KNEc" as const;
const SERVICE_WORKER_PATH = "/firebase-messaging-sw.js" as const;

const firebaseConfig: firebaseConfigParameters = {
  apiKey: "AIzaSyDGGrstRaHn44IGLvGwZbbaFImJuCaijQQ",
  authDomain: "ping-folio-123.firebaseapp.com",
  projectId: "ping-folio-123",
  storageBucket: "ping-folio-123.firebasestorage.app",
  messagingSenderId: "299089530015",
  appId: "1:299089530015:web:28dab13ea41e36f46466aa"
} as const;

// ✅ Always safe in Vite (pure client app)
const app: FirebaseApp = initializeApp(firebaseConfig);

let messaging: Messaging | null = null;

const getClientMessaging = (): Messaging => {
  if (!messaging) {
    messaging = getMessaging(app);
  }
  return messaging!;
};

export const getPlatform = (): platform => {
  return Capacitor.getPlatform() as platform;
};

export const notificationPermissionGranted = (): boolean =>
  typeof Notification !== "undefined" && Notification.permission === "granted";

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (typeof Notification === "undefined") {
    throw new Error("Notifications not supported in this browser");
  }
  return await Notification.requestPermission();
};

export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration> => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service workers not supported in this browser");
  }
  const registration = await navigator.serviceWorker.register(SERVICE_WORKER_PATH);
  console.log("Service Worker registered:", registration);
  return registration;
};

export const getFCMToken = async (registration: ServiceWorkerRegistration): Promise<string | null> => {
  try {
    const token = await getToken(getClientMessaging(), {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    if (!token) {
      console.warn("No FCM token received.");
      return null;
    }
    console.log("Web FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Failed to get FCM token:", error);
    throw error;
  }
};

export const requestFcmToken = async (): Promise<tokenRequestResult> => {
  const platform = getPlatform();
  let token: tokenRequestResult = { success: false, error: `${platform} not found` };

  switch (platform) {
    case "web":
      token = await requestWebToken();
      break;
    case "android":
      // token = await requestAndroidToken();
      break;
    case "ios":
      // token = await requestIOSToken();
      break;
  }
  return token;
};

export const setupMessageListener = (callback: (payload: MessagePayload) => void): (() => void) => {
  return onMessage(getClientMessaging(), callback);
};

export const findCreateUID = (): string => {
  let uid = localStorage.getItem("clientDeviceUID");
  if (!uid) {
    uid = uuidv4();
    localStorage.setItem("clientDeviceUID", uid);
  }
  return uid;
};

const findCreateFmcToken = async (): Promise<string | null> => {
  let fmcToken: string | null = localStorage.getItem("fcmToken");
  if (!fmcToken) {
    try {
      const result = await requestFcmToken();
      if (result.success && result.token) fmcToken = result.token;
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
  }
  return fmcToken;
};

export const initFetchFcmAndDeviceID = async (): Promise<[string | null, string]> => {
  return [await findCreateFmcToken(), findCreateUID()];
};

export const testForegroundNotification = () => {
  if (Notification.permission === "granted") {
    const notification = new Notification("Test Notification", {
      body: "This is a test notification to verify foreground notifications are working.",
      icon: "/logo2.jpeg",
      tag: "Evalor Testing",
      requireInteraction: true,
    });

    notification.onclick = (event) => {
      event.preventDefault();
      window.focus();
      notification.close();
    };

    setTimeout(() => notification.close(), 5000);
  } else {
    console.warn("Cannot test notification - permission not granted");
  }
};

export const setupForegroundMessageHandler = () => {
  try {
    const messagingInstance = getClientMessaging();
    onMessage(messagingInstance, (payload) => {
      console.log("Message received in foreground:", payload);

      const title = payload.notification?.title || payload.data?.title || "TrainKhana";
      const body = payload.notification?.body || payload.data?.body || "";
      const icon = payload.notification?.icon || payload.data?.icon || "/logo2.jpeg";
      const clickAction = payload.data?.click_action || payload.fcmOptions?.link || "/";

      if (Notification.permission === "granted") {
        const notification = new Notification(title, {
          body,
          icon,
          tag: "trainkhana-notification",
          data: { click_action: clickAction },
          requireInteraction: true,
        });

        notification.onclick = (event) => {
          event.preventDefault();
          window.focus();
          if (clickAction && clickAction !== "/") {
            if (clickAction.startsWith("http")) {
              window.open(clickAction, "_blank");
            } else {
              window.location.href = clickAction;
            }
          }
          notification.close();
        };

        setTimeout(() => notification.close(), 10000);
      } else {
        console.warn("Notification permission not granted. Cannot show foreground notification.");
      }
    });
  } catch (error) {
    console.error("Failed to setup foreground message handler:", error);
  }
};
