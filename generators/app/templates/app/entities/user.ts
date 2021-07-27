import { ObjectType, Field, Directive } from 'type-graphql';

@Directive(`@key(fields: "id")`)
@ObjectType()
export class User {
  @Field(() => String)
  public id!: string;

  @Field(() => String)
  public name!: string;  

  @Field(() => String)
  public countryCode!: string;  
}