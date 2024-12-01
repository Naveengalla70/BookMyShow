import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RpasswordComponent } from './pages/rpassword/rpassword.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { UserdashboardComponent } from './pages/userdashboard/userdashboard.component';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { UserhomeComponent } from './pages/userhome/userhome.component';
import { AddMovieComponent } from './pages/addmovie/addmovie.component';
import { EdittourComponent } from './pages/edittour/edittour.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { MybookingComponent } from './pages/mybooking/mybooking.component';
import { UserBookedComponent } from './pages/userBooked/booktour.component';
import { UserbookingComponent } from './pages/userbooking/userbooking.component';
import { WelcomepageComponent } from './pages/welcomepage/welcomepage.component';
import { ReviewboardComponent } from './pages/reviewboard/reviewboard.component';
import { AdminhalllistComponent } from './pages/adminhalllist/adminhalllist.component';
import { UserhalllistComponent } from './pages/userhalllist/userhalllist.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomepageComponent, //
  },
  {
    path: 'signIn',
    component: SigninComponent, //
  },
  {
    path: 'signup',
    component: SignupComponent, //
  },
  {
    path: 'resetpassword',
    component: RpasswordComponent, //
  },
  {
    path: 'admindashboard',
    component: AdmindashboardComponent,
    children: [
      {
        path: 'home',
        component: AdminhomeComponent, //
      },
      {
        path: 'adminMovie/:id/:flag',
        component: AddMovieComponent, //
      },
      {
        path: 'userbooking', //
        component: UserbookingComponent,
      },
      {
        path: 'review', //
        component: ReviewboardComponent,
      },
      {
        path: 'hallList', //
        component: AdminhalllistComponent,
      },
    ],
  },
  {
    path: 'userdashboard',
    component: UserdashboardComponent,
    children: [
      {
        path: 'home', //
        component: UserhomeComponent,
      },
      {
        path: 'profile',
        component: UserprofileComponent, //
      },
      {
        path: 'mybooking/:id/:flag',
        component: MybookingComponent, //
      },
      {
        path: 'userbooking', //
        component: UserBookedComponent,
      },
      {
        path: 'moviesreview/:id',
        component: EdittourComponent, //
      },
      {
        path: 'hallList', //
        component: UserhalllistComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
