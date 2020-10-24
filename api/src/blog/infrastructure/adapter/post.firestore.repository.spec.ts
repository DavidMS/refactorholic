import * as sinon from "ts-sinon";
import {StubbedInstance} from "ts-sinon";
import * as admin from "firebase-admin";
import Firestore = admin.firestore.Firestore;
import CollectionReference = admin.firestore.CollectionReference;
import Query = admin.firestore.Query;
import QuerySnapshot = admin.firestore.QuerySnapshot;
import QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
import PostFirestoreRepository from "./post.firestore.repository";
import PostEntity from "../../domain/model/post.entity";
import IllegalArgumentError from "../../../common/error/illegal.argument.error";

describe('PostRepositoryImpl', () => {

  let postRepository: PostFirestoreRepository;
  let firestoreStub: StubbedInstance<Firestore>
  let collectionReferenceStub: StubbedInstance<CollectionReference<PostEntity>>;
  let queryStub: StubbedInstance<Query<PostEntity>>;
  let querySnapshotStub: StubbedInstance<QuerySnapshot<PostEntity>>;
  let queryDocumentSnapshotStub: StubbedInstance<QueryDocumentSnapshot<PostEntity>>;

  beforeEach(() => {
    queryStub = sinon.stubInterface<Query<PostEntity>>();

    collectionReferenceStub = sinon.stubInterface<CollectionReference<PostEntity>>();
    collectionReferenceStub.withConverter.returns(collectionReferenceStub);
    collectionReferenceStub.where.returns(queryStub);
    collectionReferenceStub.orderBy.returns(queryStub);

    firestoreStub = sinon.stubInterface<Firestore>();
    firestoreStub.collection.returns(collectionReferenceStub);

    querySnapshotStub = sinon.stubInterface<QuerySnapshot<PostEntity>>()
    queryDocumentSnapshotStub = sinon.stubInterface<QueryDocumentSnapshot<PostEntity>>()

    postRepository = new PostFirestoreRepository(firestoreStub);
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
          fail('Should have rejected');
        } catch (e) {
          expect(e).toBeInstanceOf(IllegalArgumentError);
        }

        expect(firestoreStub.collection).not.toHaveBeenCalled()
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
        fail('Should have rejected');
      } catch (e) {
        expect(e).toEqual(expectedError);
      }

      expect(firestoreStub.collection).toBeCalledTimes(1)
      expect(firestoreStub.collection).toBeCalledWith('posts')

      expect(collectionReferenceStub.where).toBeCalledTimes(1)
      expect(collectionReferenceStub.where).toBeCalledWith('slug', '==', slug)
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
      expect(result).toBeNull()

      expect(firestoreStub.collection).toBeCalledTimes(1)
      expect(firestoreStub.collection).toBeCalledWith('posts')

      expect(collectionReferenceStub.where).toBeCalledTimes(1)
      expect(collectionReferenceStub.where).toBeCalledWith('slug', '==', slug)
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
      expect(result).not.toBeNull();
      expect(result).toBeInstanceOf(PostEntity);
      expect(result).toHaveProperty('slug', slug);
      expect(result).toHaveProperty('text', text);

      expect(firestoreStub.collection).toBeCalledTimes(1)
      expect(firestoreStub.collection).toBeCalledWith('posts')

      expect(collectionReferenceStub.where).toBeCalledTimes(1)
      expect(collectionReferenceStub.where).toBeCalledWith('slug', '==', slug)
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
        fail('Should have rejected');
      } catch (e) {
        expect(e).toEqual(expectedError);
      }

      expect(firestoreStub.collection).toBeCalledTimes(1)
      expect(firestoreStub.collection).toBeCalledWith('posts')

      expect(collectionReferenceStub.orderBy).toBeCalledTimes(1)
      expect(collectionReferenceStub.orderBy).toBeCalledWith('publishDate', 'desc')
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
      expect(result).toHaveLength(0);

      expect(firestoreStub.collection).toBeCalledTimes(1)
      expect(firestoreStub.collection).toBeCalledWith('posts')

      expect(collectionReferenceStub.orderBy).toBeCalledTimes(1)
      expect(collectionReferenceStub.orderBy).toBeCalledWith('publishDate', 'desc')
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
      expect(result).not.toBeNull()
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(PostEntity);
      expect(result[0]).toHaveProperty('slug', slug);

      expect(firestoreStub.collection).toBeCalledTimes(1)
      expect(firestoreStub.collection).toBeCalledWith('posts')

      expect(collectionReferenceStub.orderBy).toBeCalledTimes(1)
      expect(collectionReferenceStub.orderBy).toBeCalledWith('publishDate', 'desc')
    });
  });
});
