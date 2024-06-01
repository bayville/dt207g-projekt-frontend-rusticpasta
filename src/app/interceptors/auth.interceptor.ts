import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService); // Inject the StorageService
  const authToken = storageService.getUser(); // Get the user data
  const router = inject(Router); // Inject the Router service

  // List of protected routes
  const protectedRoutes = ['/dashboard', '/protected'];

  // Check if the request URL is a protected route
  const isProtectedRoute = protectedRoutes.some(route => req.url.includes(route));

  if (isProtectedRoute) {
    // Clone the request and add the authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });

    // Pass the cloned request with the updated header to the next handler
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        console.error('An error occurred:', error);

        if (error.status === 401) {
          // Handle unauthorized errors
          console.error('Åtkomst nekad, ogiltig token');
          window.alert('Åtkomst nekad, var god att logga in');
          router.navigateByUrl('/login');
        } else if (error.status === 403) {
          // Handle forbidden errors
          console.error('Åtkomst nekad');
          window.alert('Åtkomst nekad, var god att logga in');
          router.navigateByUrl('/login');
        } else {
          // Handle other types of errors
          console.error('Error: ', error);
        }

        // Return an observable with a user error message
        return throwError(() => new Error('Något gick fel'));
      })
    );
  } else {
    return next(req);
  }
};
