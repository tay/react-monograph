import {ApolloServer} from "apollo-server-micro";
import {typeDefs} from "./schemas";
import {resolvers} from "./resolvers";

const apolloServer = new ApolloServer({typeDefs, resolvers});

// without this, apollo will throw an error.
await apolloServer.start();

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({path: "/api/graphql"});