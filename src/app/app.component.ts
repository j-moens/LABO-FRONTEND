import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Home';

  constructor(private authService: AuthService, private router: Router)
  {
  }

  public checkAuth()
  {
    return this.authService.isLoggedIn;
  }

  public logout(): void
  {
    this.authService.logout();
  }

  public profile(): void 
  {
    const profileRte = 'users/' + this.authService.getCurrentUser().id;
    this.router.navigate([profileRte]);
  }

}
