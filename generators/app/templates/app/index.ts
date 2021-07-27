import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';

import { UserResolver } from './resolvers/userResolver';
import { User } from './entities/user';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import { resolveUserReference } from './resolvers/user-reference';

async function startSubgraph(port: number): Promise<string> {
  const schema = await buildFederatedSchema(
    {
      resolvers: [UserResolver],
      orphanedTypes: [User],
    },
    {
      User: { __resolveReference: resolveUserReference },
    },
  );

  const server = new ApolloServer({
    schema,
    tracing: false,
    playground: true,
  });

  const { url } = await server.listen({ port });
  console.log(`users service ready at ${url}`);

  return url;
}

startSubgraph(3001).catch(console.error);

