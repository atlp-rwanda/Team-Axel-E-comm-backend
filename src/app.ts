import express, { Response, Request, Application } from 'express';
import cors from 'cors';
import routes from './routes/_index';
import dotenv from 'dotenv';
import session from 'express-session';

import { MessageResponse } from './interfaces/_index';

/*
 * Here we are implementing Declaration merging on express-session.
 * But an issue was raised that I didn't understand well.
 * If you figure it out, let us know.
 * I know if I tried hard enough, I would, but I'm lazy 😅
 * Take a look at the issue
 * https://stackoverflow.com/questions/65108033/property-user-does-not-exist-on-type-session-partialsessiondata#comment125163548_65381085
 */
declare module 'express-session' {
  export interface SessionData {
    userId: string;
  }
}

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 60 * 60 * 1000, // 1 hour
    },
  })
);

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
