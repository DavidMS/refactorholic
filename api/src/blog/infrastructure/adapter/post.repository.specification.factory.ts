import {Injectable} from "@nestjs/common";
import PostEntity from "../../domain/model/post.entity";
import {FirestoreRepositorySpecificationFactory} from "../../../common/infrastructure/adapter/firestore/firestore.repository.specification.factory";

@Injectable()
export class PostRepositorySpecificationFactory extends FirestoreRepositorySpecificationFactory<PostEntity> {
}