import * as sinon from "ts-sinon";
import {expect} from 'chai';
import PostRepository from "./PostRepository";
import {StubbedInstance} from "ts-sinon";
import * as admin from "firebase-admin";
import Firestore = admin.firestore.Firestore;
import IllegalArgumentError from "../error/IllegalArgumentError";
import CollectionReference = admin.firestore.CollectionReference;
import Query = admin.firestore.Query;
import DocumentData = admin.firestore.DocumentData;
import QuerySnapshot = admin.firestore.QuerySnapshot;
import QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
import PostEntity from "../domain/PostEntity";

describe('PostRepository.findPostBySlug()', () => {

  let postRepository: PostRepository;
  let firestoreStub: StubbedInstance<Firestore>
  let collectionReferenceStub: StubbedInstance<CollectionReference<DocumentData>>;
  let queryStub: StubbedInstance<Query<DocumentData>>;
  let querySnapshotStub: StubbedInstance<QuerySnapshot<DocumentData>>;
  let queryDocumentSnapshotStub: StubbedInstance<QueryDocumentSnapshot<DocumentData>>;

  before(() => {
    queryStub = sinon.stubInterface<Query<DocumentData>>();

    collectionReferenceStub = sinon.stubInterface<CollectionReference>();
    collectionReferenceStub.where.returns(queryStub);

    firestoreStub = sinon.stubInterface<Firestore>();
    firestoreStub.collection.returns(collectionReferenceStub);

    querySnapshotStub = sinon.stubInterface<QuerySnapshot<DocumentData>>()
    queryDocumentSnapshotStub = sinon.stubInterface<QueryDocumentSnapshot<DocumentData>>()

    postRepository = new PostRepository(firestoreStub);
  });

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
    const expectedDocument = { slug, text }

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
