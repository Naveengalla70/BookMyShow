import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { apiUrls } from '../../enviroment/apiUrls';
import { environment } from '../../enviroment/environment';
import { localStorageSession } from '../shared/localStorage';
const _baseUrl = environment.BEServer.DevEnviroment;
const _apiUrl = apiUrls.Service;

// const _authToken = localStorage.getItem('Admin-Token');

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(
    private _httpClient: HttpClient,
    private _localStorage: localStorageSession
  ) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._localStorage.getItem('Common-Token')}`,
  });

  AddProfile(data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddProfile, data, {
      headers: this.headers,
    });
  }

  UpdateProfile(_data: any) {
    return this._httpClient.put(_baseUrl + _apiUrl.UpdateProfile, _data, {
      headers: this.headers,
    });
  }

  GetProfile(data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetProfile + '?UserId=' + data,
      {
        headers: this.headers,
      }
    );
  }

  // getAllComments() {
  //   return this._httpClient.get(_baseUrl + _apiUrl.getAllComments + '?id=1', {
  //     headers: this.headers,
  //   });
  // }

  

  AddBooking(_data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddBooking, _data, {
      headers: this.headers,
    });
  }

  UpdateBooking(_data: any) {
    return this._httpClient.put(_baseUrl + _apiUrl.UpdateBooking, _data, {
      headers: this.headers,
    });
  }

  GetBookingByUserId(_data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetBooking + '?UserId=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  AddReview(data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddReview, data, {
      headers: this.headers,
    });
  }

  UpdateReview(_data: any) {
    return this._httpClient.put(_baseUrl + _apiUrl.UpdateReview, _data, {
      headers: this.headers,
    });
  }

  GetReviewByMovieId(_data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetReviewByMovieId + '?MovieId=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  DeleteReview(_data: any) {
    return this._httpClient.delete(
      _baseUrl + _apiUrl.DeleteReview + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  SearchMovie(_data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.SearchMovie + '?keyWord=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  SearchMovieBycategory(_data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.SearchMovieBycategory + '?keyWord=' + _data,
      {
        headers: this.headers,
      }
    );
  }
}
