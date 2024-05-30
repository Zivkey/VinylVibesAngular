import { User } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    const user = new User(
      '1',
      'John',
      'Doe',
      'john.doe@example.com',
      'password123',
      false,
      'jwt'
    );
    expect(user).toBeTruthy();
  });
});