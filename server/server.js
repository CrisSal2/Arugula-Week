const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Payment integration
const { authenticateUser } = require("./utils/auth");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

// Load environment variables
dotenv.config();

const app = express();

// Middleware to authenticate user via JWT
app.use(authenticateUser);

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    token: req.headers.authorization || "",
  }),
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  // MongoDB connection
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
