const authors = [
    { id: 1, firstName: "Tom", lastName: "Coleman" },
    { id: 2, firstName: "Sashko", lastName: "Stubailo" }
  ]
  
  const posts = [
    { id: 1, authorId: 1, title: "Introduction to GraphQL", votes: 2 },
    { id: 2, authorId: 2, title: "GraphQL Rocks", votes: 3 },
    { id: 3, authorId: 2, title: "Advanced GraphQL", votes: 1 }
  ]
  
  const resolverFunctions = {
    Query: {
      posts() {
        return posts
      },
      author(_ : any, id: any) {
        return authors.find(author => author.id === id)
      }
    },
    Mutation: {
      upvotePost(_ : any, postId: any) {
        // tslint:disable-next-line: no-shadowed-variable
        const post = posts.find(post => post.id === postId)
        if (!post) {
          throw new Error(`Couldn't find post with id ${postId}`)
        }
        post.votes += 1
        // pubsub.publish('postUpvoted', post);
        return post
      }
    },
    Author: {
      posts(author: any) {
        return posts.filter(post => post.authorId === author.id)
      }
    },
    Post: {
      author(post: any) {
        return authors.find(author => author.id === post.authorId)
      }
    }
  }
  
  export default resolverFunctions;
