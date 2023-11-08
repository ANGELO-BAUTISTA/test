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

    listOfPosts: Post[] = [
        /*
      new Post("Shaq",
        "https://ph.images.search.yahoo.com/images/view;_ylt=Awrx._7wAUtlfPMBO6W1Rwx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzNiYjM4MmI5NzY0YWU0NTRiNDVkNjZhOTQ4NWM2YzA2BGdwb3MDOARpdANiaW5n?back=https%3A%2F%2Fph.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dshaq%26type%3DE210PH91215G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D8&w=1485&h=1200&imgurl=i2.wp.com%2Ftrue-magazine.com%2Fwp-content%2Fuploads%2F2017%2F07%2Fshaquille-2.jpg%3Fssl%3D1&rurl=https%3A%2F%2Ftrue-magazine.com%2Ftrue-athletes-that-tried-to-rap-shaquille-o-neal%2F&size=157.7KB&p=shaq&oid=3bb382b9764ae454b45d66a9485c6c06&fr2=piv-web&fr=mcafee&tt=TRUE+Athletes+That+Tried+to+Rap+-+Shaquille+O%26%2339%3B+Neal+-+TRUE+MAGAZINE&b=0&ni=21&no=8&ts=&tab=organic&sigr=AEnTTo7QtsdI&sigb=d00joUG9Mpon&sigi=qgQE5RHsL09t&sigt=ZNkqNfNk1DYP&.crumb=I297b9jPR6D&fr=mcafee&fr2=piv-web&type=E210PH91215G0",
        "Shaquille Rashaun O Neal, nicknamed Shaq, is an American retired professional basketball player who is a sports analyst on the television program Inside the NBA on TNT. He is widely considered one of the greatest players in the history of the National Basketball Association.",
        "Angelo",
        new Date,
        9
      ),
      new Post("Kain po tayo",
        "https://techcrunch.com/wp-content/uploads/2023/09/GettyImages-1060287836.jpg?w=1390&crop=1",
        "Today, that group went a step further when the Linux Foundation announced OpenTofu, the official name for the Terraform fork, which will live forever under the auspices of the foundation as open source project. At the same time, the project announced it would be applying for entry into the Cloud Native Computing Foundation (CNCF).",
        "Angelo",
        new Date,
        2
      ),
      */
    ];

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
            this.setPosts(listofPosts);
        });
    }
}