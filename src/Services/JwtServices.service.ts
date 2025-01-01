import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  /**
   * Decode a JWT token to extract claims.
   * @param token - The JWT token.
   * @returns The decoded payload or null if the token is invalid.
   */
  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid JWT token', error);
      return null;
    }
  }

  /**
   * Get a specific claim from the JWT token.
   * @param token - The JWT token.
   * @param claim - The claim key to retrieve.
   * @returns The claim value or null if not found.
   */
  getClaim(token: string, claim: string): any {
    const decoded = this.decodeToken(token);
    return decoded ? decoded[claim] : null;
  }
}
