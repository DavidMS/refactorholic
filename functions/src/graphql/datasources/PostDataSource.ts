import {DataSource} from 'apollo-datasource';
import PostView from "../../view/PostView";
import PostRepository from "../../domain/repository/PostRepository";

export default class PostDataSource extends DataSource {

  constructor(readonly repository: PostRepository) {
    super();
  }

  public async findBySlug(slug: string): Promise<PostView | null> {
    return this.repository.findPostBySlug(slug);
  }

  public async findAllPublished(): Promise<PostView[]> {
    return this.repository.findAllPublished();
  }
}
