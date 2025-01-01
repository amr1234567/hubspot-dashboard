import { inject, Injectable } from '@angular/core';
import { StorageKey } from '../Constants/storage-keys.constants';
import { CustomCookieService } from './CustomCookieService.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private cookieService = inject(CustomCookieService);
  constructor() { }

  setToken(token: string, expireDate: Date): void {
    localStorage.setItem(StorageKey.AccessToken, token);
    localStorage.setItem(StorageKey.AccessTokenExpireDate, expireDate.toString());
    this.cookieService.saveCookie(StorageKey.AccessToken, token, expireDate);
  }

  isTokenValid(): boolean {
    const token = this.cookieService.getCookie(StorageKey.AccessToken) ?? this.getToken();
    const expireDate = localStorage.getItem(StorageKey.AccessTokenExpireDate);

    // Ensure both token and expiration date exist
    if (!token || !expireDate) {
      return false;
    }

    // Parse the expiration date and validate it
    const expireTimestamp = new Date(expireDate).getTime();
    if (isNaN(expireTimestamp)) {
      console.error('Invalid expiration date format in localStorage');
      return false;
    }

    // Check if the current time is before the expiration date
    return Date.now() < expireTimestamp;
  }


  removeToken(): void {
    localStorage.removeItem(StorageKey.AccessToken);
    localStorage.removeItem(StorageKey.AccessTokenExpireDate);
  }

  getToken(): string | null {
    return localStorage.getItem(StorageKey.AccessToken);
  }

}
