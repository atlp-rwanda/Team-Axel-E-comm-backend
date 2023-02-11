import express, { Response, Request, Application } from 'express';
import cors from 'cors';
import routes from './routes/_index';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';

import { MessageResponse } from './interfaces/_index';

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
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 60 * 60 * 1000, // 1 hour
    },
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

app.use('/api/v1', routes);

export default app;
