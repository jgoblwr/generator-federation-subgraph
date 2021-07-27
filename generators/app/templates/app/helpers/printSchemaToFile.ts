import 'reflect-metadata';
import fs from 'fs'
import { buildFederatedSchema } from './buildFederatedSchema';
import { NonEmptyArray } from 'type-graphql';
import { printSchema } from '@apollo/federation';
import { GraphQLResolverMap } from 'apollo-graphql';

export async function printSchemaToFile(filepath: string, resolvers: NonEmptyArray<Function>, orphanedTypes?: Function[], referenceResolvers?: GraphQLResolverMap<any>) {
  const schema = await buildFederatedSchema({
    resolvers,
    orphanedTypes
  },
  referenceResolvers);  

  fs.writeFileSync(filepath, printSchema(schema));
}
