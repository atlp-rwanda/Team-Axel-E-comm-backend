import express, { Response, Request, Application } from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';

import { MessageResponse } from './interfaces';

declare module 'express-session' {
  export interface SessionData {
    userId: string;
  }
}

dotenv.config();

const PORT = process.env.PORT;

const app: Application = express();

//-memory unleaked---------
app.set('trust proxy', 1);
app.use(
  session({
    cookie: {
      secure: true,
      maxAge: 60000,
    },
    secret: 'secret',
    saveUninitialized: true,
    resave: false,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// eslint-disable-next-line @typescript-eslint/ban-types
app.get<{}, MessageResponse>('/', async (req: Request, res: Response) => {
  res.status(200).send({
    status: 200,
    success: true,
    message: `Welcome to team Cypher's API! Endpoints available at http://localhost:${PORT}/api/v1 + whatever endpoint you want to hit`,
  });
});

app.use('/api/v1', routes);

export default app;
