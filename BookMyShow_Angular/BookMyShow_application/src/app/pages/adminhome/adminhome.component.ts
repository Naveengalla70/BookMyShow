import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMovieComponent } from '../addmovie/addmovie.component';
import { Router } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css',
})
export class AdminhomeComponent {
  tourLocationList: any[] = [];
  List: any[] = [];
  userID = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public businessService: BusinessService,
    private _snackBar: MatSnackBar
  ) {}

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

  handleDeleteMovie(id: number) {
    this.businessService.DeleteMovie(id)
    .subscribe((result: any) => {
      console.log('Result : ', result);
      this.handleGetMovieList();
    });
  }

  handleNevigateTour() {
    this.router.navigate(['/admindashboard/adminMovie/0/false']);
  }

  handleEditMovie(id: number) {
    this.router.navigate(['/admindashboard/adminMovie/' + id+'/true']);
  }

  handleRemoveTour(tourId: Number) {
    // this.businessService.deleteTourLocation(tourId).subscribe({
    //   next: (result: any) => {
    //     console.log('Result : ', result);
    //     this.openSnackBar('Remove Tour Successfully');
    //     this.handleGetMovieList();
    //   },
    //   error: (error: any) => {
    //     console.log('Error : ', error);
    //     this.openSnackBar('Something went wrong');
    //   },
    // });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
