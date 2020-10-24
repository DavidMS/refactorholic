import {Module} from '@nestjs/common';
import {BlogModule} from "./blog/infrastructure/blog.module";
import {GraphQLModule} from "@nestjs/graphql";

@Module({
  imports: [
    BlogModule,
    GraphQLModule.forRoot({
      typePaths: ['src/blog/infrastructure/presentation/graphql/blog.graphql'],
      include: [BlogModule],
      path: 'blog',
    }),
  ]
})
export class AppModule {}
