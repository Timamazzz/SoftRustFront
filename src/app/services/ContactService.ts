import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Contact} from "../models/contact";

@Injectable()
export class ContactService {

  private url = "https://localhost:7249/Contact/";

  constructor(private http: HttpClient){ }

  get(): any{
    return this.http.get(this.url + "getall")
  }

  update(contact: Contact) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Contact>(this.url, JSON.stringify(contact), {headers:myHeaders});
  }
  delete(id?: number){
    return this.http.delete<Contact>(this.url + id);
  }
}
