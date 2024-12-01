import { Component } from '@angular/core';
import $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { localStorageSession } from '../../shared/localStorage';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-booktour',
  templateUrl: './booktour.component.html',
  styleUrl: './booktour.component.css',
})
export class UserBookedComponent {
  Id = 0;
  UserID: Number = 0;
  bookingTourId: Number = 0;
  locationImageUrl: string = '';
  IsEdit = false;
  List: any[] = [];
  Poster = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _localStorage: localStorageSession,
    private serviceService: ServiceService
  ) {
    this.UserID = Number(this._localStorage.getItem('User-Id'));
  }

  ngOnInit() {
    this.handleGetBookingByUserId();
  }

  handleGetBookingByUserId() {
    this.serviceService.GetBookingByUserId(this.UserID).subscribe({
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


  handleEditBooking(id: any) {
    window.location.href = '/userdashboard/mybooking/' + id + '/true';
  }

  handleDeleteBooking(id: any, quentitys: any, totalPrices: any) {
    let data = {
      id: id,
      status: 'CANCELLED',
      quentity: quentitys,
      totalPrice: totalPrices,
    };
    this.serviceService.UpdateBooking(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('cancel Booking Successfully');
        this.handleGetBookingByUserId();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleReview(data:any){
    window.location.href = "userdashboard/moviesreview/"+data
  }
}
