import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor(
    public router: Router,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }
  
  user: any = {};
  hide: boolean = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  loading: boolean | undefined;
  forgot(user: any) {
    this.loading = true;
    this.auth.sendPasswordResetEmail(this.user.email).then(res => {
      this.loading = false;
      alert('Password reset confirmation was sent successfully!. Please check your email.');
      this.router.navigate(['/login']);
    }).catch(err => {
      this.loading = false;
      alert('Password reset confirmation failed to send. Please try again.');
    });
  }

}
