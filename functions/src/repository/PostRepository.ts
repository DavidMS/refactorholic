import PostEntity from "../domain/PostEntity";

// TODO: Get from firestore
const posts: PostEntity[] = [
  new PostEntity('first-post', 'Hello, this is the first post')
];

export default class PostRepository {
  async findPostBySlug(slug: string): Promise<PostEntity | undefined> {
    return posts.find(p => p.slug === slug);
  }
}
