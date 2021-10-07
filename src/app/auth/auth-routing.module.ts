import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LOGIN_PATH, REGISTER_PATH, AUTH_HOME_PATH } from '../constants/routes';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: LOGIN_PATH, component: LoginComponent },
  { path: REGISTER_PATH, component: RegisterComponent },
  { path: AUTH_HOME_PATH, component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
