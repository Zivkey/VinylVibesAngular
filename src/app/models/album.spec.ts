import { Genre } from '../enum/genre.enum';
import { Album } from './album';

describe('Album', () => {
  it('should create an instance', () => {
    expect(new Album('', '', '', '', '', 2020, 0, 0, Genre.HipHop)).toBeTruthy();
  });
});
