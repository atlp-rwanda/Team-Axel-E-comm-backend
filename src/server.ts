import { Request, Response } from 'express';
import app from './app';
import sequelizeConnection from './db/config';
import swaggerDocs from './docs/swagger';

const PORT = process.env.PORT || 3000;

// Connect to the db
(async () => {
  await sequelizeConnection();
})();
const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`🍏 Server 🏃 running on http://localhost:${PORT} ... 🚢`);
      // swagger documentation
      swaggerDocs(app, Number(PORT));
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
      console.log('Unexpected error', error);
    }
  }
};

void start();
