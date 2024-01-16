import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'app-album', 
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  albums: Album[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit() {
    this.loadAlbums();
  }

  vote() {

  }

  loadAlbums() {
    this.albumService.getAllAlbums().subscribe(
      (albums) => {
        this.albums = albums;
      },
      (error) => {
        console.error('Error fetching albums:', error);
      }
    );
  }
}