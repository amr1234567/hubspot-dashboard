import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomCookieService {
  /**
   * Save a cookie with an optional expiration date.
   * @param name - The name of the cookie.
   * @param value - The value of the cookie.
   * @param expireDate - The Date until the cookie expires.
   */
  saveCookie(name: string, value: string, expireDate: Date): void {
    const cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${expireDate.toString()};path=/;secure;SameSite=Strict`;
    document.cookie = cookieString;
  }

  /**
   * Retrieve the value of a cookie.
   * @param name - The name of the cookie.
   * @returns The value of the cookie or null if it doesn't exist.
   */
  getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (decodeURIComponent(cookieName) === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  /**
   * Check if a cookie exists and is not expired.
   * @param name - The name of the cookie.
   * @returns True if the cookie exists; otherwise, false.
   */
  isCookieExpired(name: string): boolean {
    return this.getCookie(name) === null;
  }

  /**
   * Delete a specific cookie.
   * @param name - The name of the cookie.
   */
  deleteCookie(name: string): void {
    const expireDate = new Date(0); // Set expiration date to the past
    document.cookie = `${encodeURIComponent(name)}=;expires=${expireDate.toUTCString()};path=/;secure;SameSite=Strict`;
  }

  /**
   * Delete all cookies.
   */
  deleteAllCookies(): void {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const cookieName = cookie.split('=')[0];
      this.deleteCookie(decodeURIComponent(cookieName));
    }
  }
}
