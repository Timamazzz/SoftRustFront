import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Message} from "../classes/message";

@Injectable()
export class MessageService {

  private url = "https://localhost:7249/Message/";

  constructor(private http: HttpClient){ }

  get(): any{
    return this.http.get(this.url + "getall")
  }

  update(message: Message) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Message>(this.url, JSON.stringify(message), {headers:myHeaders});
  }
  delete(id?: number){
    return this.http.delete<Message>(this.url + id);
  }
}
