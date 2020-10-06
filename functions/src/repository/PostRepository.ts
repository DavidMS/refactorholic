import PostEntity from "../domain/PostEntity";
import admin from "firebase-admin";
import Firestore = admin.firestore.Firestore;
import {validateNotBlank} from "../utils/validationUtils";
import IllegalArgumentError from "../error/IllegalArgumentError";

export default class PostRepository {

  constructor(private readonly firestore: Firestore) {
  }

  async findPostBySlug(slug: string): Promise<PostEntity | null> {
    validateNotBlank(slug, () => new IllegalArgumentError('the slug must not be blank'));

    try {
      const snapshot = await this.firestore.collection('posts')
        .where('slug', '==', slug)
        .get();

      if (snapshot.empty) {
        return null;
      } else {
        const {slug, text} = snapshot.docs[0].data()
        return new PostEntity(slug, text);
      }
    } catch (e) {
      throw e;
    }
  }
}