import { Injectable } from '@angular/core';
import { PostService } from './post-service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import {  tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {

  constructor(private postService: PostService, private http: HttpClient) { }

  saveData() {
    const listOfPosts: Post[] = this.postService.getPost();
    this.http.put(
      'https://angularez-default-rtdb.firebaseio.com/posts.json',
      listOfPosts)
      .subscribe((res) => {
        console.log(res)
      })
  }
  fetchData() {
   return this.http.get<Post[]>(
      'https://angularez-default-rtdb.firebaseio.com/posts.json')
      .pipe
      (tap((listOfPosts: Post[]) => {
        console.log(listOfPosts)
        this.postService.setPosts(listOfPosts);
      }));
  }
}