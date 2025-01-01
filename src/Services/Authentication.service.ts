import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { LoginModel } from '../Models/login-dto.model';
import { BaseApiResponse } from '../Models/base-api-response.model';
import { TokenModel } from '../Models/token-model.model';
import { StorageKey } from '../Constants/storage-keys.constants';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { ApiStatusCode, BASE_URL, customHeaders, LOGIN_END_POINT, REFRESH_TOKEN_END_POINT } from '../Constants/api.constants';
import { CustomCookieService } from './CustomCookieService.service';
import { TokenService } from './Token.service';
import { JwtService } from './JwtServices.service';
import { catchError, map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnDestroy {

  private readonly model$ = new BehaviorSubject<CustomIdentity | null>(null);
  private readonly destroy$ = new Subject<void>();

  get userModel() {
    return this.model$.asObservable();
  }


  constructor(
    private http: HttpClient,
    private cookieServices: CustomCookieService,
    private tokenService: TokenService,
    private jwtServices: JwtService
  ) {
    const result = this.InitializeModel();
    if (result) {
      const [token, refreshToken] = result;
      this.model$.next({ token, refreshToken });
    }
  }

  // Login method, returns an observable for better handling
  login(model: LoginModel): Observable<boolean> {
    return this.http.post<BaseApiResponse<TokenModel>>(
      `${BASE_URL}${LOGIN_END_POINT}`,
      JSON.stringify(model),
      { headers: customHeaders }
    ).pipe(
      tap(data => {
        if (data.statusCode === ApiStatusCode.OK && data.data) {
          this.saveToken(data.data);
        }
      }),
      catchError(() => {
        // Handle login failure if necessary
        return of();
      }),
      switchMap((u, i) => this.userModel.pipe(map(u => !!u))),
    );
  }

  // Refresh the token using the current access token
  refreshTheTokenWithAccessToken(accessToken: string): Observable<boolean> {
    const [token, refreshToken] = this.collectTokens;

    return this.http.post<BaseApiResponse<TokenModel>>(
      `${BASE_URL}${REFRESH_TOKEN_END_POINT}`,
      JSON.stringify({ accessToken, refreshToken }),
      { headers: customHeaders }
    ).pipe(
      tap((data) => {
        if (data.statusCode === ApiStatusCode.OK && data.data) {
          this.saveToken(data.data);
        }
        return data;
      }),
      catchError((error) => {
        this.handleUnauthorized();
        return of(false); // Return false if refresh fails
      }),
      switchMap((u, i) => this.userModel.pipe(map(u => !!u))),
    );
  }


  // Refresh the token using the stored token and refresh token
  refreshTheToken(): Observable<boolean> {
    const [token, refreshToken] = this.collectTokens;

    return this.http.post<BaseApiResponse<TokenModel>>(
      `${BASE_URL}${REFRESH_TOKEN_END_POINT}`,
      JSON.stringify({ accessToken: token, refreshToken: refreshToken }),
      { headers: customHeaders }
    ).pipe(
      tap(data => {
        if (data.statusCode === ApiStatusCode.OK && data.data) {
          this.saveToken(data.data);
        }
      }),
      catchError(() => {
        this.handleUnauthorized();
        return of();
      }),
      switchMap((u, i) => this.userModel.pipe(map(u => !!u))),
    );
  }

  // Save token to local storage and cookies
  private saveToken(tokenModel: TokenModel) {
    this.tokenService.setToken(tokenModel.token, tokenModel.expireDate);
    this.cookieServices.saveCookie(StorageKey.RefreshToken, tokenModel.refreshToken, tokenModel.refreshTokenExpireDate);
    this.model$.next({ token: tokenModel.token, refreshToken: tokenModel.refreshToken });
  }

  // Handle unauthorized access (clear tokens and model)
  handleUnauthorized() {
    this.clearTokens();
    this.model$.next(null);
  }

  // Check if the user is authenticated

  isAuthenticated(): Observable<boolean> {
    const model = this.model$.value;
    const [token, refreshToken] = this.collectTokens;

    // If no model and tokens are missing, return false
    if (!model && (!token || !refreshToken)) {
      return of(false);
    }

    const cookieExpired = this.cookieServices.isCookieExpired(StorageKey.RefreshToken);
    const tokenValid = this.tokenService.isTokenValid();

    // If both tokens are valid, return true
    if (!cookieExpired && tokenValid) {
      return of(true);
    }

    // If tokens are invalid but we have a token, try refreshing
    if ((cookieExpired || !tokenValid) && token) {
      return this.refreshTheTokenWithAccessToken(token);
    }

    // Otherwise, return false
    return of(false);
  }


  // Check if the user is an admin
  isUserAdmin(): Observable<boolean> {
    if (this.model$.value !== null) {
      const user = this.model$.value;
      if (!user || !user.token) return of(false);
      const role = this.jwtServices.getClaim(user.token, "role");
      const checking = role !== null && ((role instanceof Array && role[0].toLowerCase() === "admin")
        || ((typeof role === "string") && role.toLowerCase() === "admin"));
      return of(checking);
    }
    return this.userModel.pipe(map(user => {
      if (!user || !user.token) return false;
      const role = this.jwtServices.getClaim(user.token, "role");
      return role !== null && ((role instanceof Array && role[0].toLowerCase() === "admin")
        || ((typeof role === "string") && role.toLowerCase() === "admin"));
    }))
  }

  // Logout the user by clearing tokens
  logout() {
    this.handleUnauthorized();
  }

  // Clear tokens from local storage and cookies
  private clearTokens() {
    localStorage.removeItem(StorageKey.AccessToken);
    this.cookieServices.deleteCookie(StorageKey.RefreshToken);
  }

  // Initialize the model by checking if the tokens are valid
  private InitializeModel(): [string, string] | null {
    if (!this.tokenService.isTokenValid()) {
      this.model$.next(null);
    }
    if (this.cookieServices.isCookieExpired(StorageKey.RefreshToken)) {
      this.model$.next(null);
      return null;
    }
    const token = this.cookieServices.getCookie(StorageKey.AccessToken);
    if (!token) {
      this.model$.next(null);
      return null;
    }
    const refreshToken = this.cookieServices.getCookie(StorageKey.RefreshToken);
    if (!refreshToken) {
      this.model$.next(null);
      return null;
    }
    return [token, refreshToken];
  }


  private get collectTokens(): [string, string] {
    const token = this.cookieServices.getCookie(StorageKey.AccessToken);
    if (!token) return ["", ""];
    const refreshToken = this.cookieServices.getCookie(StorageKey.RefreshToken);
    if (!refreshToken) return ["", ""];
    return [token, refreshToken];
  }

  // Cleanup when the service is destroyed
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// Type for storing user token and refresh token
export type CustomIdentity = {
  token?: string;
  refreshToken?: string;
};
