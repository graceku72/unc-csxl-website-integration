import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Checkin } from '../checkin';
import { CheckinService } from '../checkin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  registrationService: RegistrationService;

  public users$: Observable<User[]>;
  public checkins$: Observable<Checkin[]>;
  constructor(registrationService: RegistrationService, checkinService: CheckinService) {
    this.users$ = registrationService.getUsers();
    this.checkins$ = checkinService.getCheckins();
    this.registrationService = registrationService;
  }

  deleteUser(pid: number) {
    this.registrationService
    .deleteUser(pid)
    .subscribe({
      next: (user) => this.onSuccess(user),
      error: (err) => this.onError(err)
    })
  }

  private onSuccess(user: User): void {
    window.alert(`${user.first_name} ${user.last_name} has been deleted`);
    window.location.reload();
  }

  private onError(err: Error | HttpErrorResponse){
    if (err instanceof HttpErrorResponse){
      window.alert(err.error.detail);
    } else if (err.message) {
      window.alert(err.message);
    } else {
      window.alert("Unknown error: " + JSON.stringify(err));
    }
  }
}