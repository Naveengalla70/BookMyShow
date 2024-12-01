import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ServiceService } from '../../services/service.service';
import { localStorageSession } from '../../shared/localStorage';

@Component({
  selector: 'app-edittour',
  templateUrl: './edittour.component.html',
  styleUrl: './edittour.component.css',
})
export class EdittourComponent {
  Id = 0;
  MovieID: Number = 0;
  UserID = 0;
  Status = null;
  locationImageUrl: string = '';
  List: any[] = [];
  MovieName = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  IsEdit = false;
  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private serviceService: ServiceService,
    private _localStorage: localStorageSession
  ) {
    this.UserID = Number(this._localStorage.getItem('User-Id'));
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      // Access the id parameter from the URL
      this.MovieID = params['id'];

      // Now you can use this.itemId in your component logic
      console.log('Item ID:', this.MovieID);
    });

    this.GetReviewByMovieId();
  }

  GetReviewByMovieId() {
    this.serviceService.GetReviewByMovieId(this.MovieID).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.List = result;
        //$('#movieName').val(result[0].movieName);
        this.MovieName = result[0].movieName;
      },
      error: (error: any) => {
        console.log('Error : ', error);
      },
    });
  }

  handleValidation() {
    $('#locationNameHelp').hide();
    $('#locationImageUrlHelp').hide();
    $('#confirmPasswordHelp').hide();
    let value = true;
    console.log('locationName : ', $('#locationName').val());

    if ($('#locationName').val() === '') {
      $('#locationNameHelp').show();
      value = false;
    }

    console.log('locationImageUrl : ', $('#locationImageUrl').val());
    if ($('#locationImageUrl').val() === '') {
      $('#locationImageUrlHelp').show();
      value = false;
    }

    console.log('costOfTravel : ', $('#costOfTravel').val());
    if ($('#costOfTravel').val() === '') {
      $('#costOfTravelHelp').show();
      value = false;
    }

    return value;
  }

  handleEditComment(data: any) {
    $('#comment').val(data.comment);
    $('#rating').val(data.rating);
    this.IsEdit = true;
    this.Id = data.id;
  }

  handleDeleteComment(id: any) {
    this.serviceService.DeleteReview(id).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Delete Review Successfully');
        this.GetReviewByMovieId();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  handleStatus(status: any) {
    this.Status = status;
    $('#status').val(status ? 'LIKE' : 'UNLIKE');
  }

  handleSubmit() {
    if (!this.IsEdit) {
      this.handleAdd();
    } else {
      this.handleEdit();
    }
  }

  handleAdd() {
    $('#commentHelp').hide();
    $('#ratingHelp').hide();
    let Value = false;
    if ($('#comment').val() === '') {
      $('#commentHelp').show();
      Value = true;
    }
    if (Number($('#rating').val()) <= 0 || Number($('#rating').val()) >= 6) {
      $('#ratingHelp').show();
      Value = true;
    }

    if (Value) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      userId: this.UserID,
      movieId: this.MovieID,
      comment: $('#comment').val(),
      rating: Number($('#rating').val()),
      like: this.Status,
    };
    this.serviceService.AddReview(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Add Review Successfully');
        this.GetReviewByMovieId();
        this.handleClear();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }
  handleEdit() {
    $('#commentHelp').hide();
    $('#ratingHelp').hide();
    let Value = false;
    if ($('#comment').val() === '') {
      $('#commentHelp').show();
      Value = true;
    }
    if (Number($('#rating').val()) <= 0 || Number($('#rating').val()) >= 6) {
      $('#ratingHelp').show();
      Value = true;
    }

    if (Value) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      id: this.Id,
      userId: this.UserID,
      movieId: this.MovieID,
      comment: $('#comment').val(),
      rating: Number($('#rating').val()),
      like: this.Status,
    };
    this.serviceService.UpdateReview(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Update Review Successfully');
        this.GetReviewByMovieId();
        this.handleClear();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleClear() {
    $('#comment').val('');
    $('#rating').val('');
    $('#status').val('');
  }
}
