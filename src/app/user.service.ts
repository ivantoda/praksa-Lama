import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:3000/';
  constructor(private httpClient:HttpClient) { }

  getUsers()
  {
    return this.httpClient.get(this.url + 'users');
  }

  getPostByUserId(userId : Number)
  {
    return this.httpClient.get(this.url + 'postByUser?userId=' + userId);
  }

  putUser(name: string, email: string)
  {
      const params = new HttpParams()
        .set('name', name)
        .set('email', email);
      this.httpClient.put<any>(this.url + 'addUser', {}, { params }).subscribe();
  }

  editUser(userID: number, name: string, email: string)
  {
    const body = { name, email };
    this.httpClient.put<any>(this.url + 'editUser/' + userID, body).subscribe(
      response => {
        console.log(response.message);
      },
      error => {
        console.error(error);
      }
    );
  }
}