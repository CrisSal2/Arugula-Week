const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { authMiddleware } = require("./utils/auth");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  // MongoDB connection
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
