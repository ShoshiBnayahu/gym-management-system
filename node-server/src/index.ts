import express from 'express';
import cors from 'cors';
import  connectDB  from './config/database';
import config from './config/config';
import userRoutes from './routes/userRoutes';

const app = express();
const port = config.server.port;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});

   




