import PostEntity, {PostEntityProps} from "../../domain/model/post.entity";
import admin from "firebase-admin";
import Timestamp = admin.firestore.Timestamp;

interface PostDocument {
  publishDate: Timestamp,
  slug: string,
  text?: string,
  title?: string,
}

export class PostFirestoreConverter implements FirebaseFirestore.FirestoreDataConverter<PostEntity> {
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): PostEntity {

    const data = snapshot.data() as PostDocument

    return new PostEntity({
      ...data,
      publishDate: data.publishDate != null ? data.publishDate.toDate() : undefined
    } as PostEntityProps);
  }

  toFirestore(modelObject: PostEntity): FirebaseFirestore.DocumentData;
  toFirestore(modelObject: Partial<PostEntity>, options: FirebaseFirestore.SetOptions): FirebaseFirestore.DocumentData;
  toFirestore(modelObject: PostEntity | Partial<PostEntity>, options?: FirebaseFirestore.SetOptions): FirebaseFirestore.DocumentData {
      throw Error('Cannot save posts');
  }

}