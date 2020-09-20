import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PostPage from "./pages/PostPage";
import {ApolloProvider} from "@apollo/client";
import client from "./graphql/client";

function App() {
  return (
      <ApolloProvider client={client}>
          <BrowserRouter>
              <Switch>
                  <Route exact path="/posts/:slug" component={PostPage}/>
              </Switch>
          </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
