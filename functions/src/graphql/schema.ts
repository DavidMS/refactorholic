const {gql} = require('apollo-server-express');

export default gql`
type Post {
  slug: String
  text: String
  title: String
}

# the schema allows the following query:
type Query {
  posts: [Post]
  post(slug: String!): Post
}
`;
