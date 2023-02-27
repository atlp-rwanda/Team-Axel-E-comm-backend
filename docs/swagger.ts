import { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '🌀 Team Cypher 🛍️ 🛒 E-commerce API 🪁 🧑‍🍳 🍽️ 🥬',
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
    swagger: '3.0',
  },
  apis: ['./docs/*.docs.yaml'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: Application, port: number) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  if (process.env.NODE_ENV === 'development') {
    console.log(`🍏 Read docs 📚 at http://localhost:${port}/docs`);
  } else {
    console.log(`🍏 Read docs 📚 at ${process.env.CLIENT_URL as string}/docs`);
  }
};

export default swaggerDocs;
