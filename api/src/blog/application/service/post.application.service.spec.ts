import {PostRepository} from "../../domain/port/post.repository";
import * as sinon from "ts-sinon";
import {StubbedInstance} from "ts-sinon";
import {PostApplicationService} from "./post.application.service";
import PostEntity from "../../domain/model/post.entity";

describe('PostDataSource', () => {

  let repositoryStub: StubbedInstance<PostRepository>
  let postService: PostApplicationService

  beforeEach(() => {
    repositoryStub = sinon.stubInterface<PostRepository>();
    postService = new PostApplicationService(repositoryStub);
  })

  describe('findPostBySlug()', () => {
    it('should return the repository result', async () => {
      // Given
      const expectedSlug = 'the-slug';
      const expectedText = 'the text';

      const post: PostEntity = new PostEntity({slug: expectedSlug, text: expectedText});
      repositoryStub.findPostBySlug.returns(Promise.resolve(post));

      // When
      const result = await postService.findBySlug(expectedSlug);

      // When
      expect(result).not.toBeNull();
      expect(result).toHaveProperty('slug', post.slug)
      expect(result).toHaveProperty('text', post.text);
    });

    it('should reject then the repository rejects', async () => {
      // Given
      const expectedError = new Error('the error message');
      repositoryStub.findPostBySlug.rejects(expectedError);

      // Then
      try {
        await postService.findBySlug('a slug');
        fail('should have rejected');
      } catch (e) {
        expect(e).toEqual(expectedError);
      }
    });
  });

  describe('findAllPublished()', () => {
    it('should return the repository result', async () => {
      // Given
      const expectedSlug = 'the-slug';
      const expectedText = 'the text';

      const posts: PostEntity[] = [new PostEntity({slug: expectedSlug, text: expectedText})];
      repositoryStub.findAllPublished.returns(Promise.resolve(posts));

      // When
      const result = await postService.findAllPublished();

      // When
      expect(result).not.toBeNull();
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('slug', posts[0].slug);
      expect(result[0]).toHaveProperty('text', posts[0].text);
    });

    it('should reject then the repository rejects', async () => {
      // Given
      const expectedError = new Error('the error message');
      repositoryStub.findAllPublished.rejects(expectedError);

      // Then
      try {
        await postService.findAllPublished();
        fail('should have rejected');
      } catch (e) {
        expect(e).toEqual(expectedError);
      }
    });
  });
});
