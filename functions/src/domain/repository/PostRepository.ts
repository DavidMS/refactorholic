import PostEntity from "../entity/PostEntity";

export default interface PostRepository {
    findPostBySlug(slug: string): Promise<PostEntity | null>;
    findAllPublished(): Promise<PostEntity[]>;
}
