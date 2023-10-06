import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Checkin } from '../checkin';
import { CheckinService } from '../checkin.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  public users$: Observable<User[]>;
  public checkins$: Observable<Checkin[]>
  constructor(registrationService: RegistrationService, checkinService: CheckinService) {
    this.users$ = registrationService.getUsers();
    this.checkins$ = checkinService.getCheckins();
  }

}