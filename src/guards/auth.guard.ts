import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  const isLoggedIn: boolean = storageService.isLoggedIn();

  if (isLoggedIn === false) {
    router.navigate(['/login']);
    return false;
  }

  return true;

};
