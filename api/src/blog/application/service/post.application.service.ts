import {Inject, Injectable} from "@nestjs/common";
import PostEntity from "../../domain/model/post.entity";
import {PostRepository} from "../../domain/port/post.repository";

@Injectable()
export class PostApplicationService {

  constructor(
    @Inject('PostRepository') private readonly repository: PostRepository ) {
  }

  public async findBySlug(slug: string): Promise<PostEntity | null> {
    return this.repository.findPostBySlug(slug)
  }

  public async findAllPublished(): Promise<PostEntity[]> {
    return this.repository.findAllPublished()
  }
}