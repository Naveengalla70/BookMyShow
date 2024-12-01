import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { localStorageSession } from '../../shared/localStorage';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BusinessService } from '../../services/business.service';
@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.component.html',
  styleUrl: './mybooking.component.css',
})
export class MybookingComponent {
  UserBookingTour: any[] = [];
  List: any[] = [];
  UserID = 0;
  MovieID = 0;
  ImageURL = '';
  IsEdit = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private router: Router,
    private serviceService: ServiceService,
    private _localStorage: localStorageSession,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private businessService: BusinessService
  ) {
    this.UserID = Number(this._localStorage.getItem('User-Id'));
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.\

    this.route.params.subscribe((params) => {
      // Access the id parameter from the URL

      this.MovieID = Number(params['id']);
      let Flag = params['flag'];
      if (Flag === 'false') {
        this.IsEdit = false;
        this.handleGetMovieById(this.MovieID);
      } else {
        this.IsEdit = true;
        this.handleGetBookingByUserId();
      }

      // Now you can use this.itemId in your component logic
      console.log('Item ID:', this.MovieID);
    });

    //this.handleGetComment();
  }

  async handleGetBookingByUserId() {
    await this.serviceService.GetBookingByUserId(this.UserID).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        let data = result.filter((x: any) => x.id == this.MovieID)[0];
        this.handleGetMovieById(data.movieId);
        $('#totalPrice').val(data.totalPrice);
        $('#quentity').val(data.quentity);
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleGetMovieById(MovieID: any) {
    this.businessService.GetMovieById(MovieID).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.ImageURL = result.posterURL;
        $('#movieName').val(result.movieName);
        $('#movieDescription').val(result.movieDescription);
        $('#imageUrl').val(result.posterURL);
        $('#price').val(result.price);
        $('#screenNumber').val(result.screenNumber);
        $('#time').val(result.time);
      },
      error: (error: any) => {
        console.log('Error : ', error);
      },
    });
  }

  handleSubmit() {
    if (!this.IsEdit) {
      this.handleAddBooking();
    } else {
      this.handleEditBooking();
    }
  }

  handleChange() {
    let quentity = Number($('#quentity').val());
    if (quentity > 0) {
      $('#totalPrice').val(quentity * Number($('#price').val()));
    } else {
      $('#totalPrice').val(0);
    }
  }

  handleAddBooking() {
    $('#quentityHelp').hide();
    $('#totalPriceHelp').hide();
    if (Number($('#quentity').val()) <= 0) {
      $('#quentityHelp').show();
    }

    if (Number($('#totalPrice').val()) <= 0) {
      $('#totalPriceHelp').show();
    }

    if (
      Number($('#totalPrice').val()) <= 0 ||
      Number($('#quentity').val()) <= 0
    ) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      userId: this.UserID,
      movieId: Number(this.MovieID),
      status: 'BOOKED',
      quentity: Number($('#quentity').val()),
      totalPrice: Number($('#totalPrice').val()),
    };
    this.serviceService.AddBooking(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Add Booking Successfully');
        this.IsEdit = false;
        $('#quentity').val('');
        $('#totalPrice').val('');
        window.location.href = '/userdashboard/userbooking';
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  handleEditBooking() {
    $('#quentityHelp').hide();
    $('#totalPriceHelp').hide();
    if (Number($('#quentity').val()) <= 0) {
      $('#quentityHelp').show();
    }

    if (Number($('#totalPrice').val()) <= 0) {
      $('#totalPriceHelp').show();
    }

    if (
      Number($('#totalPrice').val()) <= 0 ||
      Number($('#quentity').val()) <= 0
    ) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      id: this.MovieID,
      status: 'BOOKED',
      quentity: Number($('#quentity').val()),
      totalPrice: Number($('#totalPrice').val()),
    };
    this.serviceService.UpdateBooking(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Update Booking Successfully');
        this.IsEdit = false;
        $('#quentity').val('');
        $('#totalPrice').val('');
        window.location.href = '/userdashboard/userbooking';
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
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

  handleClear() {
    $('#totalPrice').val('');
    $('#quentity').val('');
  }
}
