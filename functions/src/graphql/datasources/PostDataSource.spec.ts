import PostDataSource from "./PostDataSource";
import * as sinon from "ts-sinon";
import {StubbedInstance} from "ts-sinon";
import PostEntity from "../../domain/entity/PostEntity";
import {expect} from 'chai';
import PostRepository from "../../domain/repository/PostRepository";

describe('PostDataSource', () => {

    let repositoryStub: StubbedInstance<PostRepository>;
    let postDataSource: PostDataSource;

    before(() => {
        repositoryStub = sinon.stubInterface<PostRepository>();
        postDataSource = new PostDataSource(repositoryStub);
    });

    describe('findPostBySlug()', () => {
        it('should return the repository result', async () => {
            // Given
            const expectedSlug = 'the-slug';
            const expectedText = 'the text';

            const post: PostEntity = new PostEntity({slug: expectedSlug, text: expectedText});
            repositoryStub.findPostBySlug.returns(Promise.resolve(post));

            // When
            const result = await postDataSource.findBySlug(expectedSlug);

            // When
            expect(result).not.to.be.null;
            expect(result).to.have.property('slug').eql(post.slug);
            expect(result).to.have.property('text').eql(post.text);
        });

        it('should reject then the repository rejects', async () => {
            // Given
            const expectedError = new Error('the error message');
            repositoryStub.findPostBySlug.rejects(expectedError);

            // Then
            try {
                await postDataSource.findBySlug('a slug');
                expect.fail('should have rejected');
            } catch (e) {
                expect(e).to.be.equals(expectedError);
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
            const result = await postDataSource.findAllPublished();

            // When
            expect(result).not.to.be.null;
            expect(result).length(1);
            expect(result[0]).to.have.property('slug').eql(posts[0].slug);
            expect(result[0]).to.have.property('text').eql(posts[0].text);
        });

        it('should reject then the repository rejects', async () => {
            // Given
            const expectedError = new Error('the error message');
            repositoryStub.findAllPublished.rejects(expectedError);

            // Then
            try {
                await postDataSource.findAllPublished();
                expect.fail('should have rejected');
            } catch (e) {
                expect(e).to.be.equals(expectedError);
            }
        });
    });
});
