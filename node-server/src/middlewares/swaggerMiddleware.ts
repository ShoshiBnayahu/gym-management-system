import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'gym-management-system',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            role: {
              type: 'string',
              enum: ['admin', 'user'],
            },
          },
          required: ['username', 'email', 'password', 'role'],
        },
      },
    },
  },
  apis: ['./routes/*.ts'],
};

const specs = swaggerJSDoc(options);

const swaggerMiddleware = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerMiddleware;