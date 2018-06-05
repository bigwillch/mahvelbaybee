const { ApolloServer, gql } = require('apollo-server');

const characters = [
  {
    name: 'Spider-Man',
    img: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg',
  },
  {
    name: 'Captain America',
    img: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg',
  },
];

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Character {
    name: String
    img: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    characters: [Character]
  }
`;

const resolvers = {
  Query: {
    characters: () => characters,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});