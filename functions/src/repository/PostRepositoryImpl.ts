import PostEntity, {PostEntityProps} from "../domain/entity/PostEntity";
import admin from "firebase-admin";
import Firestore = admin.firestore.Firestore;
import {validateNotBlank} from "../utils/validationUtils";
import IllegalArgumentError from "../error/IllegalArgumentError";
import PostRepository from "../domain/repository/PostRepository";
import CollectionReference = admin.firestore.CollectionReference;

const postConverter = {
  fromFirestore(data: FirebaseFirestore.DocumentData): PostEntity {
    return new PostEntity({
      ...data,
      publishDate: data.publishDate != null ? data.publishDate.toDate() : undefined
    } as PostEntityProps);
  },
  toFirestore(post: PostEntity): FirebaseFirestore.DocumentData {
    return {
      slug: post.slug,
      text: post.text
    };
  }
}

export default class PostRepositoryImpl implements PostRepository {

  constructor(private readonly firestore: Firestore) {
  }

  private getCollection(): CollectionReference<PostEntity> {
    return this.firestore.collection('posts')
      .withConverter(postConverter);
  }

  async findPostBySlug(slug: string): Promise<PostEntity | null> {
    validateNotBlank(slug, () => new IllegalArgumentError('the slug must not be blank'));

    const snapshot = await this.getCollection()
      .where('slug', '==', slug)
      .get();

    if (snapshot.empty) {
      return null;
    } else {
      return snapshot.docs[0].data();
    }
  }

  async findAllPublished(): Promise<PostEntity[]> {
    const snapshot = await this.getCollection()
      .orderBy('publishDate', 'desc')
      .get();

    return snapshot.docs.map(doc => doc.data());
  }
}
