import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DataService} from '../data.service';
import {JRouter} from '../jrouter.service';
import {SnackBarService} from '../snack-bar.service';
import {User} from '../_Models/User';
import {TokensManagerService} from '../tokens-manager.service';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

  username = 'ismo';
  password = 'Sasso.1997';
  hide = true;

  constructor(
    private router: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private tokensManagerService: TokensManagerService,
    private localStorage: LocalStorageService,
  ) { }

  ngOnInit(): void {
    /*if (this.tokensManagerService.getRefreshToken()) {
      this.dataService.loginToken(this.tokensManagerService.getRefreshToken() as string)
        .then(u => this.finalizeLogin(u))
        .catch(_ => this.tokensManagerService.unsetRefreshToken());
    }*/
  }

  forgottenPassword(): void {
    this.router.goForgottenPassword();
  }

  doLogin($event: MouseEvent): void {
    $event.preventDefault();
    this.dataService.login({username : this.username, password : this.password})
      .then(u => this.finalizeLogin(u))
      .catch(e => this.snackBar.errorSnack(e.error.message));
  }

  doSignup($event: MouseEvent): void {
    $event.preventDefault();
    this.router.signup();
  }

  private finalizeLogin(user: User): void{
    this.tokensManagerService.setRefreshToken(user.refresh_token);
    this.localStorage.setPicProfile(user.profile_pic);
    this.localStorage.setUsername(user.username);
    this.router.goHome();
  }

}
