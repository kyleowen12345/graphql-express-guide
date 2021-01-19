import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    name: String!
    posts: [Post!]!
  }

  type Token {
    token: String!
  }


  extend type Query {
    user: User!
    login(name: String!, password: String!): Token! 
  }

  extend type Mutation {
    createUser(name: String!, password: String!): User!
  }
`;