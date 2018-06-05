import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Character from 'components/presentational/Character'

const CharacterQuery = () => (
  <Query
    query={gql`
      {
        characters {
          name
          img
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.characters.map((item, index) =>
        <Character
          key={index}
          name={item.name}
          img={item.img}
        />
      );
    }}
  </Query>
);

export default CharacterQuery