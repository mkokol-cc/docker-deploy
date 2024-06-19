import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(LoginService);
  const publicUrls = [environment.apiUrl+"login"]
  
  var authReq = req;

  if(!publicUrls.some(endpoint => req.url.includes(endpoint))){
    
    // Clone the request and add the authorization header
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
  }
  // Pass the cloned request with the updated header to the next handler
  
  return next(authReq).pipe(
    catchError((err: any) => {
      console.log("el interceptor capto un error en la request")

      //const notification = inject(NotificationService);

      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors         
          console.error('Unauthorized request:', err);
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err); 
    })
  );

  
};
