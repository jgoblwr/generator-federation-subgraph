import { Resolver, Query, Arg } from 'type-graphql';
import { User } from '../entities/user';
import { users } from '../data';

@Resolver()
export class UserResolver {

  @Query(returns => User)
  async me(): Promise<User> {
  
    return users.find(val => val.id === '100') as User;
  }

  @Query(returns => User)
  async getUser(
    @Arg("id") id: string
  ): Promise<User> {
  
    return users.find(val => val.id === id) as User;
  }
}