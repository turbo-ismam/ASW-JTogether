import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { SettingsComponent } from './settings/settings.component';
import { ModifyActivityComponent } from './modify-activity/modify-activity.component';
import { ModifyProfileComponent } from './modify-profile/modify-profile.component';
import { EditTextComponent } from './edit-text/edit-text.component';
import { LargeButtonComponent } from './large-button/large-button.component';
import { CardListComponent } from './card-list/card-list.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { NavigationButtonsComponent } from './navigation-buttons/navigation-buttons.component';
import { FooterComponent } from './footer/footer.component';
import { EnterPageComponent } from './enter-page/enter-page.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ParticipatedActivityCardComponent } from './participated-activity-card/participated-activity-card.component';
import { ParticipatedActivityComponent } from './participated-activity/participated-activity.component';
import { NotificationsCardComponent } from './notifications-card/notifications-card.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import { ChatComponent } from './chat/chat.component';
import { ChatMessageCardComponent } from './chat-message-card/chat-message-card.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';


const config: SocketIoConfig = { url: 'http://localhost:3000', options : {}};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    NotificationsComponent,
    CreateActivityComponent,
    SettingsComponent,
    ModifyActivityComponent,
    ModifyProfileComponent,
    EditTextComponent,
    LargeButtonComponent,
    CardListComponent,
    HomeCardComponent,
    NavigationButtonsComponent,
    FooterComponent,
    EnterPageComponent,
    ProfileCardComponent,
    ParticipatedActivityCardComponent,
    ParticipatedActivityComponent,
    NotificationsCardComponent,
    ChatComponent,
    ChatMessageCardComponent,
    ForgottenPasswordComponent,
  ],
    imports: [
        JwtModule,
        SocketIoModule.forRoot(config),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
