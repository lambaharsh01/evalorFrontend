"use client"

import type { tokenRequestResult } from "./types";
import { getFCMToken, notificationPermissionGranted, registerServiceWorker, requestNotificationPermission } from "./config";

// import { 
//   PushNotifications, 
//   PushNotificationTokenResult 
// } from "@capacitor/push-notifications";
// import { LocalNotifications } from "@capacitor/local-notifications";

export const requestWebToken = async (): Promise<tokenRequestResult> => {
  try {
    // Check notification permission
    if (!notificationPermissionGranted()) {
      const permission = await requestNotificationPermission();
      if (permission !== 'granted') {
        return {
          success: false,
          error: 'Notification permission denied'
        };
      }
    }

    // Register service worker and get token
    const registration = await registerServiceWorker();
    const token = await getFCMToken(registration);

    if (!token) {
      return {
        success: false,
        error: 'Failed to retrieve FCM token'
      };
    }

    return {
      success: true,
      token
    };
  } catch (error) {
    console.error('Web token request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};