export class Post{
    push(duplicatedPost: any) {
      throw new Error('Method not implemented.');
    }
    content: any;
    constructor(
        public title: string,
        public image: string,
        public description: string,
        public author: string,
        public dateCreated: Date,
        public likes: number = 0,
        public angry: number = 0,
        public comments: string[] = []
        ){ 

    }
}