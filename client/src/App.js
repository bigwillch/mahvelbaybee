import 'Styles/App.scss';
import React, { Component } from 'react';
import CharacterList from './components/containers/CharacterQuery'
import gql from "graphql-tag";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: 'http://localhost:4000'
});


client
  .query({
    query: gql`
      {
        characters {
          name
          img
        }
      }
    `
  })
  .then(result => console.log(result));


class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <CharacterList/>
      </ApolloProvider>
    );
  }
}

export default App;
