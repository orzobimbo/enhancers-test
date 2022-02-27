import express, { Express } from 'express';
import { config } from 'dotenv-safe';
import myCors from './utils/cors';
import initRoutes from './routes/_routes';

function bootstrap() {
  config();
  if (!process.env.PORT) {
    console.log('ERRORE: variabili ambientali assenti');
    return;
  }

  const app: Express = express();
  app.use(express.json());

  myCors(app);
  const PORT = process.env.PORT || 8080;

  initRoutes(app, 'api');

  app.listen(PORT, () => {
    console.log(`server avviato sulla porta ${PORT}`);
  });
}

bootstrap();
