import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:5001/blog-test-16eff/us-central1/api/blog',
    cache: new InMemoryCache()
});

export default client;