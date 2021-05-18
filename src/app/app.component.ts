import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Home';

  constructor(private authService: AuthService)
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

}
