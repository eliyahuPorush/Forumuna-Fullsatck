import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/main-page/header/header.component';
import { ForumsListComponent } from './components/main-page/forums-list/forums-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUPComponent } from './components/auth/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserInfoComponent } from './components/main-page/user-info/user-info.component';
import { ForumPageComponent } from './components/main-page/forum-page/forum-page.component';
import { EditForumComponent } from './components/main-page/edit-forum/edit-forum.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AboutComponent } from './components/main-page/header/about/about.component'
import { ContactComponent } from './components/main-page/header/contact/contact.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ProfileComponent } from './components/main-page/profile/profile.component';
import { OtherUserDetailsComponent } from './components/main-page/other-user-details/other-user-details.component';
import { PrivateMessagesListComponent } from './components/main-page/private-messages-list/private-messages-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ForumsListComponent,
    MainPageComponent,
    LoginComponent,
    SignUPComponent,
    UserInfoComponent,
    ForumPageComponent,
    EditForumComponent,
    UserDashboardComponent,
    AboutComponent,
    ContactComponent,
    SpinnerComponent,
    ProfileComponent,
    OtherUserDetailsComponent,
    PrivateMessagesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
