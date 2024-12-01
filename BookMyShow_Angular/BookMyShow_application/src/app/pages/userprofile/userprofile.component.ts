import { Component } from '@angular/core';
import $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { localStorageSession } from '../../shared/localStorage';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
})
export class UserprofileComponent {
  IsProfileDetailExist = false;
  ProfileID = 0;
  List: any[] = [];
  userID = 0;
  IsEdit = false;
  ExperienceID = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private router: Router,
    private businessService: BusinessService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _localStorage: localStorageSession,
    private serviceService: ServiceService
  ) {
    this.userID = this._localStorage.getItem('User-Id');
  }

  ngOnInit(): void {
    let data = this._localStorage.getItem('TravelExperience-Data');
    if (data == null) {
    } else {
      let placeDetail = JSON.parse(data);
      $('#placeName').val(placeDetail.placeName);
      $('#placeCategory').val(placeDetail.placeCategory);
      $('#placeDescription').val(placeDetail.placeDescription);
    }

    this.getProfileDetail();
  }

  getProfileDetail() {
    let UserID = this._localStorage.getItem('User-Id');
    this.serviceService.GetProfile(UserID).subscribe({
      next: (result: any) => {
        this.ProfileID = result.id;
        $('#name').val(result.name);
        $('#email').val(result.email);
        $('#address').val(result.address);
        $('#contact').val(Number(result.contact));
        $('#age').val(result.age);
        this.IsEdit = true;
      },
      error: (error: any) => {
        this.openSnackBar('Something went wrong');
        this.IsEdit = false;
      },
    });
  }

  // handleValidation() {
  //   $('#fullNameHelp').hide();
  //   $('#mobileNumberHelp').hide();
  //   $('#emailHelp').hide();
  //   $('#addressHelp').hide();
  //   let value = true;
  //   console.log('fullName : ', $('#fullName').val());

  //   if ($('#fullName').val() === '') {
  //     $('#fullNameHelp').show();
  //     value = false;
  //   }

  //   console.log('mobileNumber : ', $('#mobileNumber').val());
  //   if ($('#mobileNumber').val() === '') {
  //     $('#mobileNumberHelp').show();
  //     value = false;
  //   }

  //   console.log('email : ', $('#email').val());
  //   if ($('#email').val() === '') {
  //     $('#emailHelp').show();
  //     value = false;
  //   }

  //   console.log('address : ', $('#address').val());
  //   if ($('#address').val() === '') {
  //     $('#addressHelp').show();
  //     value = false;
  //   }

  //   return value;
  // }

  handleSubmit() {
    // debugger;
    if (this.IsEdit) {
      this.handleEditProfile();
    } else {
      this.handleAddProfile();
    }
  }

  handleAddProfile() {
    $('#nameHelp').hide();
    $('#emailHelp').hide();
    $('#addressHelp').hide();
    $('#contactHelp').hide();
    $('#ageHelp').hide();

    if ($('#name').val() === '') {
      $('#nameHelp').show();
    }
    if ($('#email').val() === '') {
      $('#emailHelp').show();
    }

    if ($('#contact').val() === '') {
      $('#contactHelp').show();
    }

    if (Number($('#age').val()) <= 0) {
      $('#ageHelp').show();
    }

    if (
      Number($('#age').val()) <= 0 ||
      $('#name').val() === '' ||
      $('#email').val() === '' ||
      $('#contact').val() === ''
    ) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      userId: Number(this._localStorage.getItem('User-Id')),
      name: $('#name').val(),
      email: $('#email').val(),
      address: $('#address').val(),
      contact: $('#contact').val(),
      age: Number($('#age').val()),
    };

    this.serviceService.AddProfile(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.IsEdit = false;
        this.openSnackBar('Create Profile Successfully');
        window.location.href = '/userdashboard/home';
        this.handleClear();
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleEditProfile() {
    $('#nameHelp').hide();
    $('#emailHelp').hide();
    $('#addressHelp').hide();
    $('#contactHelp').hide();
    $('#ageHelp').hide();

    if ($('#name').val() === '') {
      $('#nameHelp').show();
    }
    if ($('#email').val() === '') {
      $('#emailHelp').show();
    }

    if ($('#contact').val() === '') {
      $('#contactHelp').show();
    }

    if (Number($('#age').val()) <= 0) {
      $('#ageHelp').show();
    }

    if (
      Number($('#age').val()) <= 0 ||
      $('#name').val() === '' ||
      $('#email').val() === '' ||
      $('#contact').val() === ''
    ) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      id: this.ExperienceID,
      userId: Number(this._localStorage.getItem('User-Id')),
      name: $('#name').val(),
      email: $('#email').val(),
      address: $('#address').val(),
      contact: $('#contact').val(),
      age: Number($('#age').val()),
    };

    this.serviceService.UpdateProfile(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.IsEdit = false;
        this.openSnackBar('Update Profile Successfully');
        this.getProfileDetail();
        window.location.href = '/userdashboard/home';
      },
      error: (error) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleEditExperience(data: any) {
    //
    this.IsEdit = true;
    this.ExperienceID = data.id;
    $('#image').val(data.images);
    $('#costOfTravel').val(data.costOfTravel);
    $('#heritages').val(data.heritages);
    $('#placesToVisit').val(data.placesToVisit);
    $('#accessibility').val(data.accessibility);
    $('#transportation').val(data.transportation);
    $('#climate').val(data.climate);
    $('#safety').val(data.safety);
  }

  handleAddComment(data: any) {
    //
    // this.router.navigate(['comment/' + data.id]);
    window.location.href = 'userdashboard/comment/' + data.id;
  }

  handleClear() {
    this.IsEdit = false;
    $('#name').val('');
    $('#email').val('');
    $('#address').val('');
    $('#contact').val('');
    $('#age').val('');
  }
}
