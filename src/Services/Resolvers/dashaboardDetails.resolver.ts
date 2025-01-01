import type { ResolveFn } from '@angular/router';
import { DashBoardDto } from '../../Models/dashboard.model';
import { DestroyRef, inject } from '@angular/core';
import { datesMappingTokenInjector } from '../../Constants/dates-maping';
import { DashboardService } from '../Dashboard.service';

export const dashaboardDetailsResolver: ResolveFn<void> = (route, state) => {
  const dashboardServices = inject(DashboardService);
  const destroyRef = inject(DestroyRef);
  const filtersButtons = inject(datesMappingTokenInjector);
  const currentFilterButton = filtersButtons[0];

  const connection = dashboardServices.reloadDashboard({
    dateFrom: currentFilterButton.dateFrom,
    dateTo: currentFilterButton.dateTo,
  }).subscribe();
  destroyRef.onDestroy(() => connection.unsubscribe());
};
