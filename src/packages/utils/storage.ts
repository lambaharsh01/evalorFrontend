import type { AuthUserDetails } from "@/modules/auth/types";
import { storageKeys } from "./constants";

export const setStorage = (accessToken: string, userDetails: AuthUserDetails) => {
    localStorage.setItem(storageKeys.accessToken, accessToken)
    localStorage.setItem(storageKeys.userDetails, JSON.stringify(userDetails))
}
export const getUserDetails = (): AuthUserDetails | null => {
  const userDetails = localStorage.getItem(storageKeys.userDetails);
  if (!userDetails) return null;

  try {
    return JSON.parse(userDetails) as AuthUserDetails;
  } catch (e) {
    console.error("Failed to parse user details from storage", e);
    return null;
  }
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(storageKeys.accessToken);
};