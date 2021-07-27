import fs from 'fs'
import { parse } from 'graphql'
import { composeAndValidate, ServiceDefinition } from '@apollo/federation';
import { CompositionSuccess } from '@apollo/federation/dist/composition/utils';

export interface ComposeSupergraphDefinition {
  file: string,
  name: string,
  url: string
}

export function generateSuperGraph(composeSupergraphDefinitions: ComposeSupergraphDefinition[], outputFile: string){

  var serviceList = composeSupergraphDefinitions.map(definition => {
    
    let subgraphSdl = fs.readFileSync(definition.file, {encoding: 'utf-8'});

    return {
      typeDefs: parse(subgraphSdl),
      name: definition.name,
      url: definition.url
    } as ServiceDefinition; 
  });

  var compositionResult = composeAndValidate(serviceList);

  if(compositionResult.errors && compositionResult.errors.length > 0){
    console.log(`composition errors ${compositionResult.errors[0]}`);
  }
  else{
    var succesResult = compositionResult as CompositionSuccess
    fs.writeFileSync(outputFile, succesResult.supergraphSdl);
  }
}