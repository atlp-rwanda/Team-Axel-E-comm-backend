import { Request, Response } from "express";
import app from "./app";
import swaggerDocs from "../docs/swagger";
import { sequelize } from "./database/models";
import registerCronJobs from "./jobs";
const PORT = process.env.PORT;

// Connect to the db
(async () => {
  try {
    await sequelize.sync().then(() => {
      // let sequelize tell us the name of the database we are connected to
      const database = sequelize.getDatabaseName();
      console.log(`🍏 Successfully connected to the db 🔥${database}🔥`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        `🍎 Error occurred when connecting to the db: ${error.message}`,
      );
    } else {
      console.log("🍎 Unexpected error", error);
    }
  }
})();

const start = () => {
  try {
    app.listen(PORT, () => {
      // if we are in development mode, we want the server to run on localhost
      if (process.env.NODE_ENV === "development") {
        console.log(`🍏 Server 🏃 running on: http://localhost:${PORT} ... 🚢`);
      } else {
        console.log(`🍏 Server 🏃 running on ${process.env.CLIENT_URL} ... 🚢`);
      }

      // swagger documentation
      swaggerDocs(app, Number(PORT));

      // register all cron jobs ⏰
      registerCronJobs();

      // catch all "not found" routes and send this message response
      app.use((req: Request, res: Response) => {
        res.status(404).json({
          status: 404,
          success: false,
          message: "🍎 Route doesn't exist. 😢",
        });
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      // ✅ TypeScript knows error is Error
      console.log(`🍎 Error occurred when starting server: ${error.message}`);
    } else {
      console.log("Unexpected error", error);
    }
  }
};

void start();
