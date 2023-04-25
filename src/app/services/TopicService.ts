import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Topic} from "../models/topic";

@Injectable()
export class TopicService {

  private url = "https://localhost:7249/Topic/";

  constructor(private http: HttpClient){ }

  get(): any{
    return this.http.get(this.url + "getall")
  }

  update(topic: Topic) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Topic>(this.url, JSON.stringify(topic), {headers:myHeaders});
  }
  delete(id?: number){
    return this.http.delete<Topic>(this.url + id);
  }
}
