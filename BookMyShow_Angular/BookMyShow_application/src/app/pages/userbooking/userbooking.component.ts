import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BusinessService } from '../../services/business.service';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userbooking',
  templateUrl: './userbooking.component.html',
  styleUrl: './userbooking.component.css',
})
export class UserbookingComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  List: any[] = [];
  userBookingList: any[] = [];
  PlaceID = 0;

  constructor(
    private _snackBar: MatSnackBar,
    private business: BusinessService,
    private serviceService: ServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // Access the id parameter from the URL
      this.PlaceID = params['id'];

      // Now you can use this.itemId in your component logic
      console.log('Item ID:', this.PlaceID);
    });

    this.GetBookingList();
  }

  GetBookingList() {
    this.business.GetBookingList().subscribe({
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

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
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
        this.GetBookingList();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleComment(Id: any) {
    this.router.navigate(['/admindashboard/adminComment/' + Id]);
  }
}
