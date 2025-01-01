import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import Contact from '../Models/contact.model';
import { Owner } from '../Models/owner.model';
import { ApiStatusCode, BASE_URL, customHeaders, OWNERS_END_POINT } from '../Constants/api.constants';
import { BaseApiResponse } from '../Models/base-api-response.model';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private httpClient = inject(HttpClient);
  constructor() { }

  private _contacts = new BehaviorSubject<Contact[]>([]);
  contacts$ = this._contacts.asObservable();

  getContacts() {

  }
}
type GetContactsParams = {

}

