import { Answer } from './answer.model';

export class Post{
    constructor(
        public title: string, 
        public content: string, 
        public userID: number,
        public userName?: string,
        public answers?: Answer[],
        public id?: number,
    ){}
}