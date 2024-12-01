import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { apiUrls } from '../../enviroment/apiUrls';
import { environment } from '../../enviroment/environment';
import { localStorageSession } from '../shared/localStorage';
const _baseUrl = environment.BEServer.DevEnviroment;
const _apiUrl = apiUrls.Business;

// const _authToken = localStorage.getItem('Admin-Token');

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  constructor(
    private _httpClient: HttpClient,
    private _localStorage: localStorageSession
  ) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._localStorage.getItem('Common-Token')}`,
  });
  // 'Content-Type', 'text/plain'
  AddMovie(_data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddMovie, _data, {
      headers: this.headers,
    });
  }

  UpdateMovie(_data: any) {
    return this._httpClient.put(_baseUrl + _apiUrl.UpdateMovie, _data, {
      headers: this.headers,
    });
  }

  GetMovie() {
    return this._httpClient.get(_baseUrl + _apiUrl.GetMovie, {
      headers: this.headers,
    });
  }

  GetMovieById(_data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetMovieById + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  DeleteMovie(_data: any) {
    return this._httpClient.delete(
      _baseUrl + _apiUrl.DeleteMovie + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  GetBookingList() {
    return this._httpClient.get(_baseUrl + _apiUrl.GetBookingList, {
      headers: this.headers,
    });
  }

  GetReviewList() {
    return this._httpClient.get(_baseUrl + _apiUrl.GetReviewList, {
      headers: this.headers,
    });
  }

  AddTheater(_data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddTheater, _data, {
      headers: this.headers,
    });
  }

  UpdateTheater(_data: any) {
    return this._httpClient.put(_baseUrl + _apiUrl.UpdateTheater, _data, {
      headers: this.headers,
    });
  }

  GetTheater() {
    return this._httpClient.get(_baseUrl + _apiUrl.GetTheater, {
      headers: this.headers,
    });
  }

  DeleteTheater(_data: any) {
    return this._httpClient.delete(
      _baseUrl + _apiUrl.DeleteTheater + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }
}
