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

// export const requestAndroidToken = async (): Promise<tokenRequestResult> => {
//   try {
//     console.log('Requesting Android FCM token...');
    
//     // Request permissions for Android
//     const [
//         pushPermission, 
//         // localPermission
//     ] = await Promise.all([
//       PushNotifications.requestPermissions(),
//       LocalNotifications.requestPermissions()
//     ]);

//     if (pushPermission.receive !== 'granted') {
//       return {
//         success: false,
//         error: 'Push notification permission not granted on Android'
//       };
//     }

//     console.log('Android permissions granted, registering for push notifications...');
//     await PushNotifications.register();

//     // Wait for registration token with Android-specific handling
//     const token = await new Promise<string>((resolve, reject) => {
//       const timeout = setTimeout(() => {
//         reject(new Error('Android FCM token registration timeout'));
//       }, 15000); // 15 second timeout for Android (Google Play Services can be slower)

//       const registrationListener = PushNotifications.addListener(
//         'registration',
//         (tokenResult: PushNotificationTokenResult) => {
//           console.log('Android FCM token received');
//           clearTimeout(timeout);
//           registrationListener.remove();
//           errorListener.remove();
//           resolve(tokenResult.value);
//         }
//       );

//       const errorListener = PushNotifications.addListener(
//         'registrationError',
//         (error: any) => {
//           console.error('Android FCM registration error:', error);
//           clearTimeout(timeout);
//           registrationListener.remove();
//           errorListener.remove();
//           reject(new Error(`Android FCM registration failed: ${error.error || error.message || 'Unknown error'}`));
//         }
//       );
//     });

//     return {
//       success: true,
//       token
//     };
//   } catch (error) {
//     console.error('Android token request failed:', error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown Android error occurred'
//     };
//   }
// };


// export const requestIOSToken = async (): Promise<tokenRequestResult> => {
//   try {
//     console.log('Requesting iOS FCM token...');
    
//     // Request permissions for iOS
//     const [
//         pushPermission, 
//         // localPermission
//     ] = await Promise.all([
//       PushNotifications.requestPermissions(),
//       LocalNotifications.requestPermissions()
//     ]);

//     if (pushPermission.receive !== 'granted') {
//       return {
//         success: false,
//         error: 'Push notification permission not granted on iOS'
//       };
//     }

//     console.log('iOS permissions granted, registering for push notifications...');
//     await PushNotifications.register();

//     // Wait for registration token with iOS-specific handling
//     const token = await new Promise<string>((resolve, reject) => {
//       const timeout = setTimeout(() => {
//         reject(new Error('iOS FCM token registration timeout'));
//       }, 12000); // 12 second timeout for iOS

//       const registrationListener = PushNotifications.addListener(
//         'registration',
//         (tokenResult: PushNotificationTokenResult) => {
//           console.log('iOS FCM token received');
//           clearTimeout(timeout);
//           registrationListener.remove();
//           errorListener.remove();
//           resolve(tokenResult.value);
//         }
//       );

//       const errorListener = PushNotifications.addListener(
//         'registrationError',
//         (error: any) => {
//           console.error('iOS FCM registration error:', error);
//           clearTimeout(timeout);
//           registrationListener.remove();
//           errorListener.remove();
//           reject(new Error(`iOS FCM registration failed: ${error.error || error.message || 'Unknown error'}`));
//         }
//       );
//     });

//     return {
//       success: true,
//       token
//     };
//   } catch (error) {
//     console.error('iOS token request failed:', error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown iOS error occurred'
//     };
//   }
// };
