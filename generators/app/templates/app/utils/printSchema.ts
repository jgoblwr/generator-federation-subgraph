import 'reflect-metadata';
import { UserResolver } from '../resolvers/userResolver';
import { User } from '../entities/user';
import { resolveUserReference } from '../resolvers/user-reference';
import { printSchemaToFile } from '../../helpers/printSchemaToFile'

printSchemaToFile('./user-subgraph/user-subgraph.graphql', [UserResolver], [User], {
  User: { __resolveReference: resolveUserReference },
})
  .catch(() => console.log('error printing user-subgraph.graphql'));