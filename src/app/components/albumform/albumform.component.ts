import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Genre } from 'src/app/enum/genre.enum';
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-albumform',
  templateUrl: './albumform.component.html',
  styleUrls: ['./albumform.component.scss']
})
export class AlbumformComponent {
  album: Album = {
    id : '',
    likes : 0,
    dislikes: 0, 
    isLiked: false,
    isDisliked: false,
    name: '',
    image: '',
    description: '',
    artist: '',
    year: 0,
    genre: Genre.Experimental,
  };
  errorMessage: String = '';
  successMessage: String = '';
  genreOptions: string[] = Object.values(Genre).filter(value => typeof value === 'string') as string[];

  constructor(private albumService: AlbumService) {}

  onSubmit() {
    if (this.isValidAlbum()) {
      console.log('Album data:', this.album);
      const newAlbum: Album = { ...this.album };
      this.albumService.create(newAlbum).subscribe(
        (response) => {
          this.successMessage = 'Album created successfully!'
          this.album.artist = ''
          this.album.name = ''
          this.album.description = ''
          this.album.image = ''
          this.album.year = 0
        },
        (error) => {
          this.errorMessage = error
        }
      );
    } else {
      console.log(this.album)
      console.error('Invalid album data');
    }
  }

  private isValidAlbum(): boolean {
    return (
      this.album.name.trim() !== '' &&
      this.album.image.trim() !== '' &&
      this.album.description.trim() !== '' &&
      this.album.artist.trim() !== '' &&
      this.album.year > 0 &&
      this.album.genre !== undefined
    );
  }
}
