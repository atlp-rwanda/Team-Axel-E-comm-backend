import express, { Response, Request, Application } from 'express';
import cors from 'cors';
import routes from './routes/_index';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';

import { MessageResponse } from './interfaces/_index';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// eslint-disable-next-line @typescript-eslint/ban-types
app.get<{}, MessageResponse>('/', async (req: Request, res: Response) => {
  res.status(200).send({
    status: 200,
    success: true,
    message: `Welcome to team Axel's API! Endpoints available at http://localhost:${PORT}/api/v1 + whatever endpoint you want to hit`,
  });
});

/*
 * the different routes that will be used.
 * 🔴 🚓 It would be nice if we didn't directly add other routes here. 🚓 🔵
 * We could follow the pattern and export our routers from a <name>.routes.ts file,
 * & head over to the _index.ts in /router folder and add it from there
 * it will be exported along with the others.
 */

app.use('/api/v1', routes);

export default app;
