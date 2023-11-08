import { EventEmitter, Injectable } from "@angular/core";
import { Post } from './post.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PostService{
    constructor(private http: HttpClient) {
        this.fetchData();
    }

    listChangedEvent: EventEmitter<Post[]> = new EventEmitter();

    listOfPosts: Post[] = [];

    getPost(){
      return this.listOfPosts;
    }
    deleteButton(index: number){
      this.listOfPosts.splice(index, 1)
      this.saveData(); 
    }
    addPost(post: Post){
      this.listOfPosts.push(post);
      this.saveData(); 
      // this.listChangedEvent.emit(this.listOfPosts);
    }
    updatePost(index: number, post: Post){
      this.listOfPosts[index] = post;
      this.saveData(); 
    }
    getSpecPost(index: number){
      return this.listOfPosts[index];
    }
    onLike(index: number){
      this.listOfPosts[index].likes += 1;
      this.saveData(); 
    }
    setPosts(listOfPosts: Post[]){
      this.listOfPosts = listOfPosts;
      this.listChangedEvent.emit(listOfPosts);
    }

    saveData() {
        this.http.put('https://angularez-default-rtdb.firebaseio.com/posts.json', this.listOfPosts)
        .subscribe((res) => {
            console.log(res);
        });
    }

    fetchData() {
        this.http.get<Post[]>('https://angularez-default-rtdb.firebaseio.com/posts.json')
        .subscribe((listofPosts: Post[]) => {
            console.log(listofPosts)

            listofPosts.forEach(post => {
                if (!Array.isArray(post.comments)) {
                    post.comments = [];
                }
            });
            
            this.setPosts(listofPosts);
        });
    }
}