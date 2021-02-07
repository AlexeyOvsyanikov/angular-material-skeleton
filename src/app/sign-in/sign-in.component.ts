import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IUser } from './interface/user.interface';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public signInForm!: FormGroup;
  public hidePassword = true;

  public user: IUser = {
    email: '',
    password: ''
  };

  constructor(
    private _formBuilder: FormBuilder
  ) {  }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: new FormControl('' , [ Validators.required , Validators.email ]),
      password: new FormControl('' , [ Validators.required , Validators.pattern(/^[a-z0-9\$\_]{6,20}$/i) ]),
    });
  }

  public signIn() {

  }

}
