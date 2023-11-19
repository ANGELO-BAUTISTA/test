import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { PostService } from '../post-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchKeyword: string ="";
  constructor(private backEndService: BackEndService, private postService: PostService
  ) {
    this.searchKeyword = '';
  }
  ngOnInit(): void {
    
  }
  
  onSave (){
    this.backEndService.saveData();
  }

  onFetch () {
    this.backEndService.fetchData();
  }
  searchPosts(){
    this.postService.searchPosts(this.searchKeyword);
  }
                                                                    
}
