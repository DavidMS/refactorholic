import {Module} from '@nestjs/common';
import admin from "firebase-admin";
import Firestore = admin.firestore.Firestore;
import firestore from "../../common/infrastructure/adapter/firestore/firestore";
import PostFirestoreRepository from "./adapter/post.firestore.repository";
import {PostApplicationService} from "../application/service/post.application.service";
import {PostResolver} from "./presentation/graphql/post.resolver";

@Module({
  providers: [
    {
      provide: Firestore,
      useValue: firestore
    },
    {
      provide: 'PostRepository',
      useClass: PostFirestoreRepository
    },
    PostApplicationService,
    PostResolver,
  ]
})
export class BlogModule {}
