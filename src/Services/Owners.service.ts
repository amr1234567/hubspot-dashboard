import { DestroyRef, inject, Injectable } from '@angular/core';
import { Owner } from '../Models/owner.model';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseApiResponse } from '../Models/base-api-response.model';
import { ApiStatusCode, BASE_URL, customHeaders, OWNERS_END_POINT } from '../Constants/api.constants';


export class OwnersService {

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  owners$ = new BehaviorSubject<Owner[]>([]);
  constructor() { }

  loadOwners() {
    return this.httpClient.get<BaseApiResponse<Owner[]>>(
      `${BASE_URL}${OWNERS_END_POINT}`,
      { headers: customHeaders }
    ).pipe(tap({
      next: (data) => {
        if (data.statusCode === ApiStatusCode.OK && data.data) {
          this.owners$.next(data.data);
        }
      },
      error: (error) => {
        console.error('Error fetching owners:', error);
      }
    }))
  }
}
