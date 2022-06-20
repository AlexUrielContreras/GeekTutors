const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    selectedTutor: User
    isTutor: Boolean
    description: String
    image: String
    articles: [Article]
    subjectsOffered:[String]
  }

  type Article{
    _id: ID
    name: String
    image: String
    body: String
    tutorId: User
  }
  type Auth {
    token: ID
    user: User
  }

  type Query {
    GetAllUsers(token:String!): [User]
    GetCurrentUser(token:String): User
    GetAllArticles(token:String!): [Article]
    GetArticleById(token:String!,id:ID!): Article
    GetAllTutors: [User]
    GetArticlesByUserId(token:String!,Id:ID!):[Article]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    enrollStudent(token:String!,tutorId:ID!): User
    login(email: String!, password: String!): Auth
    createArticle(token:String!,name:String!,body:String!,image:String!): Article
    unenrollStudent(token:String!,tutorId:ID!): User
  }
`;
module.exports = typeDefs;
