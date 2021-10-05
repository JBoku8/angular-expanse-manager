import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, AngularFireAuthModule],
  exports: [],
})
export class SharedModule {}
