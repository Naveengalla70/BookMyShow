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
  selector: 'app-adminhalllist',
  templateUrl: './adminhalllist.component.html',
  styleUrl: './adminhalllist.component.css',
})
export class AdminhalllistComponent {
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

  handleSubmit() {
    if (this.IsEdit) {
      this.handleEdit();
    } else {
      this.handleAdd();
    }
  }

  handleClear() {
    $('#city').val('');
    $('#theaterName').val('');
    this.IsEdit = false;
  }

  handleAdd() {
    $('#cityHelp').hide();
    $('#theaterNameHelp').hide();
    let Value = false;
    if ($('#city').val() === '') {
      $('#cityHelp').show();
      Value = true;
    }

    if ($('#theaterName').val() === '') {
      $('#theaterNameHelp').show();
      Value = true;
    }

    if (Value) {
      this.openSnackBar('Please Enter Required Value');
      return;
    }

    let data = {
      city: $('#city').val(),
      theater: $('#theaterName').val(),
    };
    this.businessService.AddTheater(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Add Theater Successfully');
        this.handleClear();
        this.handleGetTheaterList();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  handleEdit() {
    $('#cityHelp').hide();
    $('#theaterNameHelp').hide();
    let Value = false;
    if ($('#city').val() === '') {
      $('#cityHelp').show();
      Value = true;
    }

    if ($('#theaterName').val() === '') {
      $('#theaterNameHelp').show();
      Value = true;
    }

    if (Value) {
      this.openSnackBar('Please Enter Required Value');
      return;
    }

    let data = {
      id: this.ID,
      city: $('#city').val(),
      theater: $('#theaterName').val(),
    };
    this.businessService.UpdateTheater(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Add Theater Successfully');
        this.handleClear();
        this.handleGetTheaterList();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  handleEditDetail(item: any) {
   
    $('#city').val(item.city);
    $('#theaterName').val(item.theater);
    this.ID = item.id;
    this.IsEdit = true;
  }

  handleDeleteBooking(id: any) {
   
    this.businessService.DeleteTheater(id).subscribe({
      next: (result: any) => {
       
        console.log('Result : ', result);
        this.openSnackBar('Delete Theater Successfully');
        this.handleClear();
        this.handleGetTheaterList();
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
}
