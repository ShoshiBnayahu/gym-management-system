import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const schemas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../schemas.json'), 'utf8'));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'gym-management-system',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    components: {
      schemas, 
    },
  },
  apis: ['./routers/*.ts'],
};

const specs = swaggerJSDoc(options);

const swaggerMiddleware = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerMiddleware;