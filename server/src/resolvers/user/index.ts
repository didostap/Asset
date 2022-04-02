import { User } from '../../entities/User';
import { MyContext } from 'src/types';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { OAuth2Client } from 'google-auth-library';
import { COOKIE_NAME } from '../../constants';
import { updateUserEntities } from './models';

const googleClient = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true, description: 'Get user from session' })
  async currentUser(@Ctx() { req, em }: MyContext): Promise<User | null> {
    const id = req.session.userId;
    const user = await em.findOne(User, { id });
    await updateUserEntities({ em, user: user as User });
    return user;
  }

  @Mutation(() => User, { description: 'Login user' })
  async signIn(
    @Arg('idToken') idToken: string,
    @Ctx() { em, req }: MyContext
  ): Promise<User> {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const googleUserId = ticket.getUserId() as string;

    const user = await em.findOne(User, { googleId: googleUserId });
    if (user) {
      req.session.userId = user.id;
      return user;
    }
    const userData = ticket.getPayload();

    const newUser = em.create(User, {
      googleId: googleUserId,
      email: userData!.email as string,
      firstName: userData!.given_name as string,
      lastName: userData!.family_name as string,
    });
    em.persistAndFlush(newUser);
    req.session.userId = newUser.id;
    return newUser;
  }

  @Mutation(() => Boolean, { description: 'Logout user' })
  signOut(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
