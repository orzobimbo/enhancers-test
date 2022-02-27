import { Request, Response, NextFunction } from 'express';

import HttpResponse from '../core/http-response';
// import { IHttpResponse } from '../types/type';

function responseHandler(inst: HttpResponse, req: Request, res: Response, next: NextFunction) {
  if (inst instanceof HttpResponse) {
    const { successful, info, data }: HttpResponse = inst;
    if (info.severity === 'error') {
      console.log('errore da salvare nel database');
    }
    return res.status(info.statusCode).json({ successful, info, data });
  }
  return null;
}

export default responseHandler;
