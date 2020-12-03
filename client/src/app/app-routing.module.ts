import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUPComponent } from './components/auth/sign-up/sign-up.component';
import { EditForumComponent } from './components/main-page/edit-forum/edit-forum.component';
import { ForumPageComponent } from './components/main-page/forum-page/forum-page.component';
import { ForumsListComponent } from './components/main-page/forums-list/forums-list.component';
import { AboutComponent } from './components/main-page/header/about/about.component';
import { ContactComponent } from './components/main-page/header/contact/contact.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { OtherUserDetailsComponent } from './components/main-page/other-user-details/other-user-details.component';
import { PrivateMessagesListComponent } from './components/main-page/private-messages-list/private-messages-list.component';
import { ProfileComponent } from './components/main-page/profile/profile.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';


const routes: Routes = [
  {path: 'main', component: MainPageComponent, children:[
    {path: 'forums-list', component: ForumsListComponent},
    {path: 'forum/:listID' ,component: ForumPageComponent},
    {path: 'add_new_forum' ,component: EditForumComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: '', redirectTo: 'forums-list', pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signUp', component: SignUPComponent},
    {path: 'usersPosts', component: UserDashboardComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'otherUserDetails/:userID', component: OtherUserDetailsComponent},
    {path: 'private-messages-list', component: PrivateMessagesListComponent}
  ]},
  {path: '', redirectTo: 'main', pathMatch:'full'},
  {path: '**', redirectTo: 'main', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
