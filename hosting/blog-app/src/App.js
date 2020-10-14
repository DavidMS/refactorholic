import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {ApolloProvider} from "@apollo/client";
import client from "./graphql/client";
import PostPage from "./pages/PostPage";
import PostsPage from "./pages/PostsPage";

function App() {
  return (
      <div id="application">
          <ApolloProvider client={client}>
              <BrowserRouter>
                  <Switch>
                      <Route exact path="/posts" component={PostsPage}/>
                      <Route exact path="/posts/:slug" component={PostPage}/>
                  </Switch>
              </BrowserRouter>
          </ApolloProvider>
      </div>
  );
}

export default App;
