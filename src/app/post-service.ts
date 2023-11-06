import { EventEmitter,Injectable } from '@angular/core';
import { Post } from './post.model';

@Injectable ({ providedIn: 'root' })
export class PostService{
    listChangedEvent: EventEmitter<Post[]> = new EventEmitter(); 
    listOfPosts: Post[] = [
      
        // new Post(
        //   'Shaq',
        //   'https://techcrunch.com/wp-content/uploads/2023/09/edsoma-kyle-shaq.jpg?w=1390&crop=1',
        //   'Edsoma, a startup that developed an AI-powered reading, education and communication platform for children, raised $2.5 million in a seed round led by Shaquille O’Neal. The trick? Founder and CEO Kyle Wallgren didn’t ask the NBA superstar and philanthropist for money.',
        //   'Angelo Bautista',
        //   new Date()
        // ),
        // new Post(
        //   'Kain po tayo!',
        //   'https://techcrunch.com/wp-content/uploads/2023/09/GettyImages-1060287836.jpg?w=1390&crop=1',
        //   'Today, that group went a step further when the Linux Foundation announced OpenTofu, the official name for the Terraform fork, which will live forever under the auspices of the foundation as open source project. At the same time, the project announced it would be applying for entry into the Cloud Native Computing Foundation (CNCF).',
        //   'Angelo Bautista',
        //   new Date()
        // ),
        
       
    ];
          getPost(){
            return this.listOfPosts;
          }
          deleteButton(index: number){
            this.listOfPosts.splice(index, 1)
          }
          addPost(post: Post){
            if (this.listOfPosts === null ){
              this.listOfPosts = []; 
            }
            this.listOfPosts.push(post);
            this.listChangedEvent.emit(this.listOfPosts);
          }
          updatePost(index: number, post: Post){
            this.listOfPosts[index] = post;
          }
          getSpecPost(index: number){
            return this.listOfPosts[index];
          }
          onLike(index: number){
            this.listOfPosts[index].likes += 1;
          }
          setPosts(listOfPosts: Post[]){
            this.listOfPosts = listOfPosts;
            this.listChangedEvent.emit(listOfPosts);
          }
}