import * as sinon from "ts-sinon";
import {expect} from 'chai';
import PostRepositoryImpl from "./PostRepositoryImpl";
import {StubbedInstance} from "ts-sinon";
import * as admin from "firebase-admin";
import Firestore = admin.firestore.Firestore;
import IllegalArgumentError from "../error/IllegalArgumentError";
import CollectionReference = admin.firestore.CollectionReference;
import Query = admin.firestore.Query;
import QuerySnapshot = admin.firestore.QuerySnapshot;
import QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
import PostEntity from "../domain/entity/PostEntity";

describe('PostRepositoryImpl', () => {

  let postRepository: PostRepositoryImpl;
  let firestoreStub: StubbedInstance<Firestore>
  let collectionReferenceStub: StubbedInstance<CollectionReference<PostEntity>>;
  let queryStub: StubbedInstance<Query<PostEntity>>;
  let querySnapshotStub: StubbedInstance<QuerySnapshot<PostEntity>>;
  let queryDocumentSnapshotStub: StubbedInstance<QueryDocumentSnapshot<PostEntity>>;

  before(() => {
    queryStub = sinon.stubInterface<Query<PostEntity>>();

    collectionReferenceStub = sinon.stubInterface<CollectionReference<PostEntity>>();
    collectionReferenceStub.withConverter.returns(collectionReferenceStub);
    collectionReferenceStub.where.returns(queryStub);
    collectionReferenceStub.orderBy.returns(queryStub);

    firestoreStub = sinon.stubInterface<Firestore>();
    firestoreStub.collection.returns(collectionReferenceStub);

    querySnapshotStub = sinon.stubInterface<QuerySnapshot<PostEntity>>()
    queryDocumentSnapshotStub = sinon.stubInterface<QueryDocumentSnapshot<PostEntity>>()

    postRepository = new PostRepositoryImpl(firestoreStub);
  });

  describe('findPostBySlug()', () => {
    [
      ['', 'empty'],
      ['  ', 'blank']
    ].forEach(([value, description]) => {
      it(`should reject IllegalArgumentError if the slug is ${description}`, async () => {
        // When
        const result = postRepository.findPostBySlug(value);

        // Then
        try {
          await result;
          expect.fail('Should have rejected');
        } catch (e) {
          expect(e).to.be.an.instanceOf(IllegalArgumentError);
        }

        firestoreStub.collection.notCalled;
      });
    });

    it('should reject if firestore rejects', async () => {
      // Given
      const slug = 'a slug';

      const expectedError = new Error('the expectedError');
      queryStub.get.rejects(expectedError);

      // When
      const result = postRepository.findPostBySlug(slug);

      // Then
      try {
        await result;
        expect.fail('Should have rejected');
      } catch (e) {
        expect(e).to.be.equal(expectedError);
      }

      firestoreStub.collection.calledOnceWith('posts');
      queryStub.where.calledOnceWith('slug', '==', slug);
    });

    it('should resolve null if firestore returns no document', async () => {
      // Given
      const slug = 'a-slug';

      querySnapshotStub = {
        ...querySnapshotStub,
        empty: true
      }

      queryStub.get.resolves(querySnapshotStub);

      // When
      const result = await postRepository.findPostBySlug(slug);

      // Then
      expect(result).to.be.null;

      firestoreStub.collection.calledOnceWith('posts');
      queryStub.where.calledOnceWith('slug', '==', slug);
    });

    it('should resolve the documents returned by firestore', async () => {
      // Given
      const slug = 'a-slug';
      const text = 'the text';
      const expectedDocument = new PostEntity({text, slug});

      queryDocumentSnapshotStub.data.returns(expectedDocument)

      querySnapshotStub = {
        ...querySnapshotStub,
        empty: false,
        docs: [queryDocumentSnapshotStub]
      }

      queryStub.get.resolves(querySnapshotStub);

      // When
      const result = await postRepository.findPostBySlug(slug);

      // Then
      expect(result).not.to.be.null;
      expect(result).to.be.an.instanceOf(PostEntity);
      expect(result).to.have.property('slug').eqls(slug);
      expect(result).to.have.property('text').eqls(text);

      firestoreStub.collection.calledOnceWith('posts');
      queryStub.where.calledOnceWith('slug', '==', slug);
    });
  });

  describe('findAllPublished()', () => {

    it('should reject if firestore rejects', async () => {
      // Given
      const expectedError = new Error('the expectedError');
      queryStub.get.rejects(expectedError);

      // When
      const result = postRepository.findAllPublished();

      // Then
      try {
        await result;
        expect.fail('Should have rejected');
      } catch (e) {
        expect(e).to.be.equal(expectedError);
      }

      firestoreStub.collection.calledOnceWith('posts');
      queryStub.orderBy.calledOnceWith('publishDate', 'desc');
    });

    it('should resolve empty array if firestore returns no document', async () => {
      // Given
      querySnapshotStub = {
        ...querySnapshotStub,
        docs: []
      }

      queryStub.get.resolves(querySnapshotStub);

      // When
      const result = await postRepository.findAllPublished();

      // Then
      expect(result).to.be.empty;

      firestoreStub.collection.calledOnceWith('posts');
      queryStub.orderBy.calledOnceWith('publishDate', 'desc');
    });

    it('should resolve the documents returned by firestore', async () => {
      // Given
      const slug = 'a-slug';
      const expectedDocument = new PostEntity({slug});

      queryDocumentSnapshotStub.data.returns(expectedDocument)

      querySnapshotStub = {
        ...querySnapshotStub,
        docs: [queryDocumentSnapshotStub]
      }

      queryStub.get.resolves(querySnapshotStub);

      // When
      const result = await postRepository.findAllPublished();

      // Then
      expect(result).not.to.be.null;
      expect(result).length(1);
      expect(result[0]).to.be.an.instanceOf(PostEntity);
      expect(result[0]).to.have.property('slug').eqls(slug);

      firestoreStub.collection.calledOnceWith('posts');
      queryStub.where.calledOnceWith('slug', '==', slug);
    });
  });
});
