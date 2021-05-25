import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) {
            return true;
        }
        
        // Navigate to the login page with extras
        this.authService.redirectUrl = url;
        this.router.navigate(['/auth']);
        return false;
    }
}

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate
{
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.authService.getCurrentUser().admin)
        {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}