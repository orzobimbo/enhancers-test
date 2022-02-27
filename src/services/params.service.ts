import { Request } from 'express';
import { validationResult, ValidationError, Result } from 'express-validator';
import { IInfo } from '../types/api';

export default class ParamsServices {
  static useExpressValidator = (errors: Result<ValidationError>) => {
    // const errors = validationResult(req);

    if (!errors.isEmpty()) {
      if (errors.array().length > 1) {
        const messList = [];
        for (let i = 0; i < errors.array().length; i++) {
          const message = errors.array()[i].msg;
          messList.push({ message });
        }
        return messList;
      }
      const message = errors.array()[0].msg;
      return [{ message }];
    }
    return false;
  };

  static isValidParams = (req: Request) => {
    const errors = validationResult(req);
    return ParamsServices.useExpressValidator(errors) as IInfo[];
  };
}
