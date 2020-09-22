import PostDataSource from "./PostDataSource";
import * as sinon from "ts-sinon";
import {StubbedInstance} from "ts-sinon";
import PostRepository from "../../repository/PostRepository";
import PostEntity from "../../domain/PostEntity";
import {expect} from 'chai';

describe('PostDataSource', () => {

    let repositoryStub: StubbedInstance<PostRepository>;
    let postDataSource: PostDataSource;

    before(() => {
        repositoryStub = sinon.stubInterface<PostRepository>();
        postDataSource = new PostDataSource(repositoryStub);
    });

    it('should return the repository result', async () => {
        // Given
        const expectedSlug = 'the-slug';
        const expectedText = 'the text';

        const post: PostEntity = new PostEntity(expectedSlug, expectedText);
        repositoryStub.findPostBySlug.returns(Promise.resolve(new PostEntity(expectedSlug, expectedText)));

        // When
        const result = await postDataSource.findBySlug(expectedSlug);

        // When
        expect(result).not.to.be.null;
        expect(result).to.have.property('slug').eql(post.slug);
        expect(result).to.have.property('text').eql(post.text);
    });

    it('should reject then the repository rejects', async () => {
        // Given
        repositoryStub.findPostBySlug.rejects;

        // Then
        expect(await postDataSource.findBySlug('a slug')).to.throw;
    });
});