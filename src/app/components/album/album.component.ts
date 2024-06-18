import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/album';
import { Router } from '@angular/router';
import { Like } from 'src/app/models/like';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  albums: Album[] = [];
  like: Like = { id: '', value: false, albumId: '', userEmail: '' };
  user: User | null = null;
  isAdmin: boolean = false;

  constructor(
    private albumService: AlbumService,
    private router: Router,
    private userService: UserService,
    private likeService: LikeService
  ) { }

  ngOnInit() {
    this.loadAlbums();
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.user.password = '';
      this.isAdmin = this.user.admin === true; 
    }
  }

  likeCall(albumId: string) {
    this.vote(true, albumId);
  }

  dislikeCall(albumId: string) {
    this.vote(false, albumId);
  }

  vote(isLike: boolean, albumId: string) {
    if (this.user) {
      const userEmail = this.user.email;
      const likeValue = isLike;
      const newLike: Like = { id: '', userEmail, albumId, value: likeValue };

      this.likeService.create(newLike).subscribe(
        (response) => {
          console.log('Album liked/disliked:', response);
          this.loadAlbums();
        },
        (error) => {
          console.error('Error liking/disliking album:', error);
        }
      );
    }
  }

  goToAlbumPage(album: Album) {
    this.albumService.setCurrentAlbum(album);
    this.router.navigate(['home/reviews']);
  }

  loadAlbums() {
    this.albumService.getAllAlbums().subscribe({
      next: (albums) => {
        this.albums = albums;
        this.albums.forEach((album) => {
          album.isLiked = false;
          album.isDisliked = false;
          if (this.user) {
            this.likeService.isLiked(album.id, this.user.id).subscribe(
              (response) => {
                if (response.value) {
                  album.isLiked = true;
                } else if (response.value === false) {
                  album.isDisliked = true;
                }
                console.log(album);
              },
              (error) => {
                console.error('Error checking if album is liked:', error);
              }
            );
          }
        });
      },
      error: (error) => {
        console.error('Error fetching albums:', error);
      }
    });
  }

  deleteAlbum(id: string) {
    if (confirm('Are you sure you want to delete this album?')) {
      this.albumService.deleteAlbum(id).subscribe(
        response => {
          console.log('Album deleted:', response);
          this.loadAlbums(); 
        },
        error => {
          console.error('Error deleting album:', error);
        }
      );
    }
  }
}
