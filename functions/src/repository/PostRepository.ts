import PostEntity from "../domain/PostEntity";
import firestore from "../config/firestore";

export default class PostRepository {
    async findPostBySlug(slug: string): Promise<PostEntity | null> {

        const snapshot = await firestore.collection('posts')
            .where('slug', '==', slug)
            .get();

        return snapshot.empty ? null : snapshot.docs[0].data() as PostEntity;
    }
}
