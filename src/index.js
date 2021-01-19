import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import dotenv from "dotenv";

import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';

import userModel from './models/userModel.js';
import postsModel from './models/postsModel.js';
import commentsModel from './models/commentsModel.js'



const app = express();
app.use(cors());
dotenv.config();

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },()=>
    console.log("connected to mongoDB")
);

const getUser = async (req) => {
  const token = req.headers['token'];

  if (token) {
    try {
      return await jwt.verify(token, 'riddlemethis');
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req);

      return {
        me,
        models: {
          userModel,
          postsModel,
          commentsModel
        },
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(4000, () => {
  console.log(`Server will start at ${4000}`)
  
});


