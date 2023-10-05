import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { CheckinService } from '../checkin.service';
import { Router } from '@angular/router';
import { Checkin } from '../checkin';
import { CheckinRequest } from '../checkin_request';



@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent {
  constructor(
    private checkinService: CheckinService,
    private formBuilder: FormBuilder,
    // private router: Router
  ) { }


  checkinForm = this.formBuilder.group({
    pid: ''
  });

  onSubmit(): void {
    let form = this.checkinForm.value;
    let pid = parseInt(form.pid ?? "")
    this.checkinService
    .addCheckin(pid)
    .subscribe({
      next: (request) => this.onSuccess(request),
      error: (err) => this.onError(err)
    })
  }

  private onSuccess(request: CheckinRequest): void {
    window.alert(`Thanks for checking in ${request.pid}`)
    this.checkinForm.reset();
  }

  private onError(err: Error){
    if (err.message){
      window.alert(err.message);
    } else {
      window.alert("Unknown error: " + JSON.stringify(err));
    }
  }

}
