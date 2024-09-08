import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const swaggerConfigPath = path.resolve(__dirname, '../config/swagger-config.json');
const swaggerConfig = JSON.parse(fs.readFileSync(swaggerConfigPath, 'utf8'));

const options = {
  definition: swaggerConfig, 
  apis: swaggerConfig.apis, 
};

const specs = swaggerJSDoc(options);

const swaggerMiddleware = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    swaggerOptions: {
      authAction: {
        BearerAuth: {
          name: 'Authorization',
          schema: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    }
  }));
};

export default swaggerMiddleware;
