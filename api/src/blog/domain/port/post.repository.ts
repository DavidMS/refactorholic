import PostEntity from "../model/post.entity";
import {EntityRepository} from "../../../common/domain/model/entity.repository";

export interface PostRepository extends EntityRepository<PostEntity>{
  findPostBySlug(slug: string): Promise<PostEntity | null>;
  findAllPublished(): Promise<PostEntity[]>;
}