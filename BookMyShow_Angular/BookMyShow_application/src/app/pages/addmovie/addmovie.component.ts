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
  selector: 'app-addtour',
  templateUrl: './addmovie.component.html',
  styleUrl: './addmovie.component.css',
})
export class AddMovieComponent {
  UserBookingTour: any[] = [];
  List: any[] = [];
  UserID = 0;
  MovieID = 0;
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
      this.MovieID = params['id'];
      let Flag = params['flag'];
      if (Flag === 'true') {
        this.IsEdit = true;
        this.handleGetMovieById(this.MovieID);
      } else {
        this.IsEdit = false;
      }
      // Now you can use this.itemId in your component logic
      console.log('Item ID:', this.MovieID, ' Flag :', Flag);
    });
  }

  handleGetMovieById(MovieID: any) {
    this.businessService.GetMovieById(MovieID).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        $('#movieName').val(result.movieName);
        $('#movieDescription').val(result.movieDescription);
        $('#imageUrl').val(result.posterURL);
        $('#price').val(result.price);
        $('#screenNumber').val(result.screenNumber);
        $('#time').val(result.time);
        $('#category').val(result.category);
      },
      error: (error: any) => {
        console.log('Error : ', error);
      },
    });
  }

  handleSubmit() {
    debugger;
    if (this.IsEdit) {
      this.handleEditMovie();
    } else {
      this.handleAddMovie();
    }
  }

  handleAddMovie() {
    console.log('Add Movie');
    debugger;
    if (this.handleValidation()) {
      this.openSnackBar('Please Enter Movie Name');
      return;
    }

    let data = {
      movieName: $('#movieName').val(),
      movieDescription: $('#movieDescription').val(),
      posterURL: $('#imageUrl').val(),
      price: Number($('#price').val()),
      screenNumber: Number($('#screenNumber').val()),
      time: $('#time').val(),
      category: $('#category').val(),
    };
    this.businessService.AddMovie(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Add Movie Successfully');
        window.location.href = '/admindashboard/home';
        this.handleClear();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  handleValidation() {
    $('#movieNameHelp').hide();
    $('#imageUrlHelp').hide();
    $('#movieDescriptionHelp').hide();
    $('#priceHelp').hide();
    $('#screenNumberHelp').hide();
    $('#timeHelp').hide();
    $('#categoryHelp').hide();
    let Value = false;
    if ($('#movieName').val() === '') {
      $('#movieNameHelp').show();
      Value = true;
    }
    if ($('#imageUrl').val() === '') {
      $('#imageUrlHelp').show();
      Value = true;
    }
    if ($('#movieDescription').val() === '') {
      $('#movieDescriptionHelp').show();
      Value = true;
    }
    if (Number($('#price').val()) <= 0) {
      $('#priceHelp').show();
      Value = true;
    }
    if (Number($('#screenNumber').val()) <= 0) {
      $('#screenNumberHelp').show();
      Value = true;
    }
    if ($('#time').val() === '') {
      $('#timeHelp').show();
      Value = true;
    }
    if ($('#category').val() === '') {
      $('#categoryHelp').show();
      Value = true;
    }
    return Value;
  }

  handleEditMovie() {
    if (this.handleValidation()) {
      this.openSnackBar('Please Enter Movie Name');
      return;
    }

    let data = {
      id: this.MovieID,
      movieName: $('#movieName').val(),
      movieDescription: $('#movieDescription').val(),
      posterURL: $('#imageUrl').val(),
      price: Number($('#price').val()),
      screenNumber: Number($('#screenNumber').val()),
      time: $('#time').val(),
      category: $('#category').val(),
    };
    this.businessService.UpdateMovie(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Update Movie Successfully');
        window.location.href = '/admindashboard/home';
        this.IsEdit = false;
        this.handleClear();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  handleEdit(Id: number, userTourBookingId: number, data: any) {
    console.log('My Booking To Profile');
    this._localStorage.setItem('EditBooking', JSON.stringify(data));
    this.router.navigate([
      '/userdashboard/booktour/' + Id + '/' + userTourBookingId,
    ]);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleEditsMovie(data: any, MovieID: any) {
    $('#Movie').val(data);
    this.IsEdit = true;
    this.MovieID = MovieID;
  }

  handleDeleteMovie(Id: Number) {
    this.businessService.DeleteMovie(Id).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Delete Movie Successfully');

        $('#Movie').val('');
        this.IsEdit = false;
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  handleClear() {
    $('#movieName').val('');
    $('#movieDescription').val('');
    $('#imageUrl').val('');
    $('#price').val('');
    $('#screenNumber').val('');
    $('#time').val('');
    this.IsEdit = false;
  }
}
