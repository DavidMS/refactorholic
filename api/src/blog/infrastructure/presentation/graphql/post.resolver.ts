import {Args, Query, Resolver} from '@nestjs/graphql';
import {PostApplicationService} from "../../../application/service/post.application.service";
import {Post} from "./blog.graphql";

@Resolver('Post')
export class PostResolver {

  constructor(private readonly postService: PostApplicationService) {
  }

  @Query()
  async post(@Args('slug') slug: string): Promise<Post | null> {
    return await this.postService.findBySlug(slug)
  }

  @Query()
  posts(): Post[] | Promise<Post[]> {
    return this.postService.findAllPublished()
  }
}