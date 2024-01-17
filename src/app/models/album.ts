import { Genre } from "../enum/genre.enum";

export class Album {
   constructor(
    public id: string,
    public name: string,
    public image: string,
    public description: string,
    public artist: string,
    public year: number,
    public likes: number,
    public dislikes: number,
    public genre: Genre,
    public isLiked: boolean,
    public isDisliked: boolean,

   ) {}
}
