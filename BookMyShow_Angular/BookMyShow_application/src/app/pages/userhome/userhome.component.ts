import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { ServiceService } from '../../services/service.service';
import { localStorageSession } from '../../shared/localStorage';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css',
})
export class UserhomeComponent {
  List: any[] = [];
  userID = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public serviceService: ServiceService,
    private businessService: BusinessService,
    private _localStorage: localStorageSession,
    private _snackBar: MatSnackBar
  ) {
    this.userID = this._localStorage.getItem('User-Id');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.handleGetMovieList();
  }

  handleGetMovieList() {
    this.businessService.GetMovie().subscribe((result: any) => {
      console.log('Result : ', result);
      this.List = result;
    });
  }

  handleBookTour() {
    console.log('My Booking To Profile');
    this.router.navigate(['/userdashboard/addplace']);
  }

  handleNevigateTour() {
    this.router.navigate(['/admindashboard/addtour']);
  }

  handleEditPlace(data: any) {
    this._localStorage.setItem('Place-Data', JSON.stringify(data));
    this.router.navigate(['userdashboard/addplace']);
  }

  handleAddExperience(data: Number) {
    this._localStorage.setItem('TravelExperience-Data', JSON.stringify(data));
    this.router.navigate(['userdashboard/addExperience']);
  }

  handleBookTicket(id: any) {
    this.router.navigate(['userdashboard/mybooking/' + id + '/false']);
  }

  handleSearch() {
    if ($('#keyword').val() === '') {
      this.openSnackBar('Please Enter Keyword');
      return;
    }

    this.serviceService.SearchMovie($('#keyword').val()).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.List = result;
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleCategorySearch() {
    if ($('#category').val() === '') {
      this.openSnackBar('Please Enter Keyword');
      return;
    }

    this.serviceService.SearchMovieBycategory($('#category').val()).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.List = result;
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleSearchClear() {
    $('#keyword').val('');
    $('#category').val('');
    this.handleGetMovieList();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
