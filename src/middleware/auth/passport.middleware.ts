import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import GoogleStrategy0, { VerifyCallback } from 'passport-google-oauth2';
import { User } from '../../db/models';
import { LoggedIn } from '../../db/models';

/*  */
const GoogleStrategy = GoogleStrategy0.Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const CLIENT_URL = process.env.CLIENT_URL as string;
// google auth
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${CLIENT_URL}/api/v1/auth/google/callback`,
      passReqToCallback: true,
    },
    async function (
      request: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifyCallback
    ) {
      try {
        const user = await User.findOne({ where: { googleId: profile.id } });
        const loggedIn = await LoggedIn.findOne({
          where: { googleId: profile.id },
        });

        if (!user) {
          const newUser = {
            surname: profile.family_name,
            given_name: profile.given_name,
            email: profile.email,
            password: profile.password || process.env.USER_PASSWORD,
            googleId: profile.id,
            avatar: profile.photos[0].value,
          };
          const googleUser = await User.create(newUser);
          console.log(
            'The user is saved in our db!!!!!!',
            done(null, googleUser)
          );
        } else {
          console.log('The user already in our db!!!!!!', done(null, user));
        }

        /** To save logged in user in our db */
        if (!loggedIn) {
          const newActiveUser = {
            surname: profile.family_name,
            given_name: profile.given_name,
            email: profile.email,
            password: profile.password || process.env.USER_PASSWORD,
            googleId: profile.id,
            avatar: profile.photos[0].value,
          };
          await LoggedIn.create(newActiveUser);
        }
      } catch (error) {
        console.log('Even error happens; The user profile: ', profile);
        if (error instanceof Error) {
          console.log(` 🔴 Error Log in user: 😟 ${error.message} 🔴`);
          console.log(error);
        } else {
          console.log('Unexpected error', error);
        }
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user: any, done) {
  done(null, user);
});
