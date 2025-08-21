
export interface firebaseConfigParameters {
  readonly apiKey: string;
  readonly authDomain: string;
  readonly projectId: string;
  readonly storageBucket: string;
  readonly messagingSenderId: string;
  readonly appId: string;
}

export interface tokenRequestResult {
  success: boolean;
  token?: string;
  error?: string;
}

export type platform = 'web' | 'android' | 'ios';
export type notificationPermission = 'granted' | 'denied' | 'default';
