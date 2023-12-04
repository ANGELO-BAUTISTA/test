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

// import { firebaseConfig } from './environment/environment'; // Add this line

// rest of your code
const routes: Routes = [
  { path: '', redirectTo: 'post-list', pathMatch: 'full'},
  { path: 'post-list', component: PostListComponent },
  { path: 'post-add', component: PostEditComponent },
  { path: 'authentication', component: AuthComponent },
  { path: 'post-edit/:index', component: PostEditComponent },
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  { path: 'post-list', component: PostListComponent },
  { path: 'post-add', component: PostEditComponent },
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
    RouterModule.forRoot(routes),
    ReactiveFormsModule, FormsModule, 
    HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }