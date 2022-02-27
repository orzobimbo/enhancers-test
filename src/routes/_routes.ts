import { Express, Request, Response } from 'express';
import citiesRoutes from './cities.route';
import responseHandler from '../middlewares/response.middleware';
import { IHttpResponse } from '../types/api';

export default function initRoutes(app: Express, api: string) {
  app.use(`/${api}/cities`, citiesRoutes);
  app.use(responseHandler);
  app.all('*', async (req: Request, res: Response) => {
    const response: IHttpResponse = {
      successful: false,
      info: {
        scope: '',
        operation: '',
        statusCode: 400,
        severity: 'error',
        message: `risorsa inesistente.`,
      },
      data: null,
    };
    res.status(400).json(response);
  });
}
