import express from 'express';
import {ApolloServer} from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolver';
import PostDataSource from "./datasources/PostDataSource";
import PostRepository from "../repository/PostRepository";

function gqlServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
    // Enable graphiql gui
    introspection: true,
    playground: true,
    dataSources: () => ({
      posts: new PostDataSource(new PostRepository()) // TODO: Get a dependency injection lib.
    })
  });

  apolloServer.applyMiddleware({app, path: '/', cors: true});

  return app;
}

export default gqlServer;
