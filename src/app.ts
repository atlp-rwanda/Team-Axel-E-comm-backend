import express, { Response, Request, Application } from "express";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";

import { sequelize } from "./database/models";
import { DataTypes } from "sequelize";

import { engine } from "express-handlebars";

declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
}

dotenv.config();

const app: Application = express();

const SequelizeSessionStore = SequelizeStore(session.Store);

sequelize.define(
  "Sessions",
  {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expires: {
      type: DataTypes.DATE,
    },
    data: {
      type: DataTypes.TEXT,
    },
  },
  { tableName: "sessions" },
);

const sessionStore = new SequelizeSessionStore({
  db: sequelize,
  table: "Sessions",
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: true, // Set to true if using HTTPS
      maxAge: 60 * 60 * 1000, // 1 hour
    },
  }),
);

sessionStore.sync();

app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", async (req: Request, res: Response) => {
  res.render("home");
});

app.use("/api/v1", routes);

export default app;
