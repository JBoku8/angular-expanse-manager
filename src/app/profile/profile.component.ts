import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { ProfileService } from '../shared/profile.service';
import { IProfileForm } from './shared/profile.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public profile: IProfileForm = {
    email: '',
    fullName: '',
    userName: '',
    uid: '',
    bio: '',
    id: '',
  };

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().then((user) => {
      if (user) {
        this.profileService.getProfileData(user.uid).subscribe((data) => {
          if (data[0]) {
            this.profile = { ...data[0] };
          }
        });
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.profileService.updateProfile(this.profile);
    }
  }
}
