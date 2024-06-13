import express, { Request, Response } from 'express';
import cors from 'cors';
// import connection from './config/db';

const app = express();
const port = 3000;

// connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});

   