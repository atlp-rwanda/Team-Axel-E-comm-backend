import { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Team-Axel E-commerce API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        jwt: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
    swagger: '3.0',
  },
  apis: [
    './src/routes/swagger.routes.ts',
    './src/utils/schemas/user.schema.ts',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: Application, port: number) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`🍏 Read docs 📚 at http://localhost:${port}/docs`);
};

export default swaggerDocs;
