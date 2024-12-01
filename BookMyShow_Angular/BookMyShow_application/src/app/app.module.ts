import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  BrowserModule,
  // provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MaterialUiModule } from './shared/material-ui/material-ui.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RpasswordComponent } from './pages/rpassword/rpassword.component';
import { UserdashboardComponent } from './pages/userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { UserhomeComponent } from './pages/userhome/userhome.component';
import { AddMovieComponent } from './pages/addmovie/addmovie.component';
import { EdittourComponent } from './pages/edittour/edittour.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { MybookingComponent } from './pages/mybooking/mybooking.component';
import { UserBookedComponent } from './pages/userBooked/booktour.component';
import { UserbookingComponent } from './pages/userbooking/userbooking.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { WelcomepageComponent } from './pages/welcomepage/welcomepage.component';
import { ReviewboardComponent } from './pages/reviewboard/reviewboard.component';
import { AdminhalllistComponent } from './pages/adminhalllist/adminhalllist.component';
import { UserhalllistComponent } from './pages/userhalllist/userhalllist.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    RpasswordComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    AdminhomeComponent,
    UserhomeComponent,
    AddMovieComponent,
    EdittourComponent,
    UserprofileComponent,
    MybookingComponent,
    UserBookedComponent,
    UserbookingComponent,
    WelcomepageComponent,
    ReviewboardComponent,
    AdminhalllistComponent,
    UserhalllistComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    MaterialUiModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
