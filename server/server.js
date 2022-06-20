const express = require('express');
const {authMiddleware} = require('./utils/auth');
const db = require('./config/connection');
const path = require('path');
const routes = require('./routes');
const {ApolloServer}=require("apollo-server-express")
const {typeDefs,resolvers}=require("./schemas")
const PORT = process.env.PORT || 3001;
const app = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
apolloServer.applyMiddleware({ app });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
});

