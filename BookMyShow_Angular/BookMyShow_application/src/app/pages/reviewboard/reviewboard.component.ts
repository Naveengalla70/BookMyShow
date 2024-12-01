import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from '../../services/service.service';
import { localStorageSession } from '../../shared/localStorage';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-reviewboard',
  templateUrl: './reviewboard.component.html',
  styleUrl: './reviewboard.component.css',
})
export class ReviewboardComponent {
  List: any[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private serviceService: ServiceService,
    private _localStorage: localStorageSession
  ) {}

  ngOnInit() {
    // debugger;
    this.GetReviewByMovieId();
  }

  GetReviewByMovieId() {
    this.businessService.GetReviewList().subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        // debugger;
        this.List = result;
      },
      error: (error: any) => {
        console.log('Error : ', error);
      },
    });
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

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
