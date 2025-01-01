import type { ResolveFn } from '@angular/router';
import { DestroyRef, inject } from '@angular/core';
import { OwnersService } from '../Services/Owners.service';

export const ownersResolver: ResolveFn<void> = (route, state) => {
  const ownersServices = inject(OwnersService);
  const destroyRef = inject(DestroyRef);

  const connection = ownersServices.loadOwners().subscribe();
  destroyRef.onDestroy(() => connection.unsubscribe());
};
