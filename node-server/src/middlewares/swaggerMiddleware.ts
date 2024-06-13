// Import the necessary libraries
import { Express} from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';



const options = {
  definition: {
  openapi: '3.0.0',
  info: {
  title: 'gym-management-system',
  version: '1.0.0',
  description: 'API documentation using Swagger',
  },
  },
  apis: ['./routes/*.ts'], 
  };

// Generate Swagger specs
const specs = swaggerJSDoc(options);

// Define the Swagger middleware function
const swaggerMiddleware = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerMiddleware;