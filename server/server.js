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
const PORT = process.env.PORT || 4000;

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === "production" 
    ? process.env.CLIENT_URL || "https://arugula-week-864c.onrender.com" 
    : "http://localhost:5173", // Local development client
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json()); // For parsing incoming JSON payloads

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
});

const startServer = async () => {
  try {
    await server.start();
    server.applyMiddleware({ app });

    // MongoDB connection
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // Server listen
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`GraphQL endpoint: ${server.graphqlPath}`);
    });

  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();















/* const express = require("express");
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
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: process.env.CLIENT_URL || "https://arugula-week-864c.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

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

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
 */