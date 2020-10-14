import PostDataSource from "./datasources/PostDataSource";
import PostView from "../view/PostView";

type GetPostContract = { readonly slug: string; }

type Config = {
  readonly dataSources: {
    readonly posts: PostDataSource
  }
}

const resolverFunctions = {
  Query: {
    post(_: unknown, post: GetPostContract, {dataSources: {posts}}: Config): Promise<PostView | null> {
      return posts.findBySlug(post.slug);
    },
    posts(_: unknown, args: undefined, {dataSources: {posts}}: Config): Promise<PostView[]> {
      return posts.findAllPublished();
    }
  }
}

export default resolverFunctions;
