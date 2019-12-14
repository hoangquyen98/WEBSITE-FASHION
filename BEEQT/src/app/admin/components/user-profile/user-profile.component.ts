import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { User, Account } from 'src/app/core/models/user';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  form: FormGroup;
  formAvatar: FormGroup;
  user: User;
  userId: string = localStorage.getItem('userId');
  imagePreview: string;
  constructor(public userService: UserService) { }
  ngOnInit() {
    this.form = new FormGroup({
      userName: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required]}),
      firstName: new FormControl(null, {validators: [Validators.required]}),
      lastName: new FormControl(null, {validators: [Validators.required]}),
      phoneNumber: new FormControl(null, {validators: [Validators.required]}),
      address1: new FormControl(null, {validators: [Validators.required]}),
      country: new FormControl(null, {validators: [Validators.required]}),
      state: new FormControl(null, {validators: [Validators.required]})
    });
    this.formAvatar = new FormGroup({
      avatar: new FormControl(null, {validators: [Validators.required]}),
    });

    this.userService.getUser(this.userId).subscribe(userData => {
      this.user = {
        id: userData.id,
        email: userData.email,
        password: userData.password,
        userName: userData.userName,
        phoneNumber: userData.phoneNumber,
        isAdmin: userData.isAdmin,
        avatar: userData.avatar,
        createdOn: userData.createdOn,
        firstName: userData.firstName,
        lastName: userData.lastName,
        address1: userData.address1,
        address2: userData.address2,
        country: userData.country,
        state: userData.state
      };
      setTimeout (() => {
      }, 1000);
      this.form.setValue({
        userName: this.user.userName,
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phoneNumber: this.user.phoneNumber,
        address1: this.user.address1,
        country: this.user.country,
        state: this.user.state

      });
    });
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.formAvatar.patchValue({avatar: file});
    this.formAvatar.get('avatar').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  onSaveAccount() {
    if (this.form.invalid) {
      return;
    }
    this.userService.updateAccount(
      this.userId,
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.phoneNumber,
      this.formAvatar.value.avatar,
      this.form.value.address1,
      this.form.value.country,
      this.form.value.state
    );
    setTimeout (() => {
      location.reload();
    }, 1000);
  }
}
