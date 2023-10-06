import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './user';
import { RegistrationService } from './registration.service';
import { CheckinComponent } from './checkin/checkin.component';
import { Checkin } from './checkin';
import { CheckinRequest } from './checkin_request';



@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor(private http: HttpClient, private registrationService: RegistrationService) { }
  getCheckins(): Observable<Checkin[]> {
    return this.http.get<Checkin[]>("/api/checkins");
  }

  addCheckin(pid: number): Observable<Checkin> {
    let errors: string[] = [];

    if (pid.toString().length !== 9) {
      errors.push(`PID must be 9 digits long`);
    }

    if (errors.length > 0) {
      return throwError(() => { return new Error(errors.join("\n")) });
    }
    
    let request: CheckinRequest = {pid}
    return this.http.post<Checkin>("/api/checkins", request);
  }
}
