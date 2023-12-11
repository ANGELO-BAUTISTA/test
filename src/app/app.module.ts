import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostListComponent } from './post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { environment } from './environment/environment';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './noauth.guard';
// Other imports...
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// Rest of your code...
// import { firebaseConfig } from './environment/environment'; // Add this line

// rest of your code
const routes: Routes = [
  { path: '', redirectTo: 'post-list', pathMatch: 'full'},
  { path: 'post-list', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'post-add', component: PostEditComponent, canActivate: [AuthGuard] },
  { path: 'authentication', component: AuthComponent ,canActivate: [AuthGuard] },
  { path: 'post-edit/:index', component: PostEditComponent, canActivate: [AuthGuard]},
  {path: 'sign-in', component: SignInComponent,canActivate: [NoAuthGuard]},
  {path: 'sign-up', component: SignUpComponent,canActivate: [NoAuthGuard]},
  { path: 'post-list', component: PostListComponent,canActivate: [AuthGuard] },
  { path: 'post-add', component: PostEditComponent ,canActivate: [AuthGuard]},
  { path: 'post-list', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'post-add', component: PostEditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    PostComponent,
    PostEditComponent,
    PostListComponent,
    SignInComponent,
    SignUpComponent,
    StarRatingComponent
  ],
  imports: [
    BrowserModule,
    // provideFirebaseApp(() => initializeApp(firebaseConfig)),
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule, FormsModule, 
    HttpClientModule],
  providers: [AuthGuard, NoAuthGuard],
  bootstrap: [AppComponent],
  
})
export class AppModule { }