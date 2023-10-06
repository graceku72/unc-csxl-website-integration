import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './user';
import { RegistrationService } from './registration.service';
import { CheckinComponent } from './checkin/checkin.component';
import { Checkin } from './checkin';
import { CheckinRequest } from './checkin_request';
import { map } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor(private http: HttpClient, private registrationService: RegistrationService) { }
  // getUser(pid: number): User{
  //   for (let i = 0; i < this.registrationService.getUsers().length; i++){
  //     if (user.pid == pid){
  //       return user;
  //     }
  //   }

  // }
  getCheckins(): Observable<Checkin[]>{
    return this.http.get<Checkin[]>("/api/checkins").pipe(map((x) => {
      return x.map((checkin) => {
        return <Checkin>({
          user: checkin.user,
          created_at: new Date(checkin.created_at)
        })
      })
    }));
    
  }

  addCheckin(pid: number): Observable<CheckinRequest> {
    let request: CheckinRequest = {pid}

    return this.http.post<CheckinRequest>("/api/checkins", request);
  }
}
