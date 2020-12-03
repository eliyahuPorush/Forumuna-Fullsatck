import { ForumMiddleware } from './forum.middleware';

describe('ForumMiddleware', () => {
  it('should be defined', () => {
    expect(new ForumMiddleware()).toBeDefined();
  });
});
