import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { localStorageSession } from '../../shared/localStorage';
import { BusinessService } from '../../services/business.service';
@Component({
  selector: 'app-userhalllist',
  templateUrl: './userhalllist.component.html',
  styleUrl: './userhalllist.component.css'
})
export class UserhalllistComponent {
  List: any[] = [];
  IsEdit = false;
  ID = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private router: Router,
    private serviceService: ServiceService,
    private _localStorage: localStorageSession,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private businessService: BusinessService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.handleGetTheaterList();
  }

  handleGetTheaterList() {
    this.businessService.GetTheater().subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.List = result;
      },
      error: (error: any) => {
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
}
