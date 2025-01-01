import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DashBoardDto, initialDashboardDto } from '../Models/dashboard.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseApiResponse } from '../Models/base-api-response.model';
import { BASE_URL, customHeaders, DASHBOARD_END_POINT } from '../Constants/api.constants';

export class DashboardService {

  private dashboardSubject = new BehaviorSubject<DashBoardDto>(initialDashboardDto);
  dashboard$: Observable<DashBoardDto> = this.dashboardSubject.asObservable();

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  constructor() { }

  reloadDashboard(params: GetDashBoardParams) {
    let httpParams = new HttpParams();

    if (params.ownerId) {
      httpParams = httpParams.append('ownerId', params.ownerId);
    }
    if (params.dateFrom) {
      httpParams = httpParams.append('dateFrom', params.dateFrom.toISOString());
    }
    if (params.dateTo) {
      httpParams = httpParams.append('dateTo', params.dateTo.toISOString());
    }

    const url = `${BASE_URL}${DASHBOARD_END_POINT}`;

    // Return the Observable from the HTTP GET request
    return this.httpClient.get<BaseApiResponse<DashBoardDto>>(url, { headers: customHeaders, params: httpParams })
      .pipe(tap({
        next: (data) => {
          if (data.statusCode === 200 && data.data) {
            this.dashboardSubject.next(data.data);
          } else {
            console.error('Failed to fetch dashboard data', data);
          }
        },
        error: (error) => {
          console.error('Failed to fetch dashboard data', error);
        }
      }))
  }
}


export type GetDashBoardParams = {
  ownerId?: string;
  dateFrom?: Date | null;
  dateTo?: Date | null;
}