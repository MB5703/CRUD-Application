import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenServiceService, private router: Router) { }

  canActivate(): boolean {
    if (this.tokenService.isLoggedIn()) {
      return true; // User is authenticated, allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to the login page
      return false; // Prevent access to the route
    }
  }
}
