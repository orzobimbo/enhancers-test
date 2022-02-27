import cors from 'cors';
import { Express } from 'express';

const myCors = (app: Express): void => {
  const corsOption = {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  };
  app.use(cors(corsOption));
};

export default myCors;
