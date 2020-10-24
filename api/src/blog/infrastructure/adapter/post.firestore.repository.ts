import admin from "firebase-admin";
import {FirestoreRepository} from "../../../common/infrastructure/adapter/firestore/firestore.repository";
import {PostFirestoreConverter} from "./post.firestore.converter";
import Firestore = admin.firestore.Firestore;
import PostEntity from "../../domain/model/post.entity";
import {PostRepository} from "../../domain/port/post.repository";
import {validateNotBlank} from "../../../common/utils/validation.utils";
import IllegalArgumentError from "../../../common/error/illegal.argument.error";
import {Injectable} from "@nestjs/common";

@Injectable()
export default class PostFirestoreRepository extends FirestoreRepository<PostEntity> implements PostRepository {
  constructor(firestore: Firestore) {
    super("posts", new PostFirestoreConverter(), firestore)
  }

  async findAllPublished(): Promise<PostEntity[]> {
    const snapshot = await this.getCollection()
      .orderBy('publishDate', 'desc')
      .get()

    return snapshot.docs.map(doc => doc.data())
  }

  async findPostBySlug(slug: string): Promise<PostEntity | null> {
    validateNotBlank(slug, () => new IllegalArgumentError('the slug must not be blank'))

    const snapshot = await this.getCollection()
      .where('slug', '==', slug)
      .get()

    if (snapshot.empty) {
      return null
    } else {
      return snapshot.docs[0].data()
    }
  }
}
