import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import config from './config/config';
import authRotes from './routes/authRoute'
import userRoutes from './routes/userRoute';
import serviceRoutes from './routes/serviceRoute';
import swaggerMiddleware from './middlewares/swaggerMiddleware'; 
import { loggedIn } from './middlewares/authMiddleware';

const app = express();
const port = config.server.port;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
swaggerMiddleware(app);
app.use('/', authRotes);
app.use(loggedIn);
app.use('/users', userRoutes);
app.use('/services', serviceRoutes);

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});