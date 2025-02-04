import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { localStorageSession } from '../../shared/localStorage';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css',
})
export class AdmindashboardComponent {
  constructor(
    private router: Router,
    private _localStorage: localStorageSession
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this._localStorage.getItem('Admin-Token') === null) {
      this.router.navigate(['']);
    }
  }

  handleHomeNav() {
    console.log('Navigate To Home');
    this.router.navigate(['/admindashboard/home']);
  }

  handleNavSignOut() {
    console.log('Navigate To SignOut');
    this._localStorage.removeItem('Admin-Id');
    this._localStorage.removeItem('Admin-Token');
    // this._localStorage.removeItem('Common-Token');
    this._localStorage.removeItem('Admin-Email');
    this.router.navigate(['']);
  }

  handleUserBooking() {
    console.log('Navigate To Home');
    this.router.navigate(['/admindashboard/userbooking']);
  }

  handleReviewNav() {
    this.router.navigate(['/admindashboard/review']);
  }

  handleTheatersNav() {
    this.router.navigate(['/admindashboard/hallList']);
  }
}
