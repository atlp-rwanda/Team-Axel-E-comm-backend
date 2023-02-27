import { Request, Response, Router } from 'express';
import passport from 'passport';
import { isLoggedIn } from '../middleware/auth/passport.middleware';

const passportRouter = Router();

// authentication pages with a link to log in
passportRouter.get('/googleAuth', (req: Request, res: Response) => {
  res.send('<a href="/api/v1/auth/google">Use Google To login</a>');
});

// 🍀 this is the actual route that will be hit so as to login with google. 🍀
passportRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

passportRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure',
  })
);
// passportRouter.get('/success', isLoggedIn, (req: Request, res: Response) => {
//   const currentUser = req.user;
//   // console.log(currentUser);
//   if (currentUser) {
//     // Here I is for test only
//     return res.status(200).json({
//       statusCode: 200,
//       message: 'success',
//       data: `Hello ${currentUser}`,
//     });
//     // res.send(`Hello ${currentUser.surName} ${currentUser.givenName}`);
//   }
// });

// passportRouter.get('/failure', (req: Request, res: Response) => {
//   const currentUser = req.user;
//   // console.log(currentUser);
//   if (currentUser) {
//     // Here I is for test only
//     return res.status(200).json({
//       statusCode: 200,
//       message: 'Log in failed may be something went wrong',
//     });
//     // res.send(`Hello ${currentUser.surName} ${currentUser.givenName}`);
//   }
// });

// // This is where a user will be redirected after signing in with google
// passportRouter.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     successRedirect: '/api/v1/success',
//     failureRedirect: '/api/v1/failure',
//   })
// );

export default passportRouter;
