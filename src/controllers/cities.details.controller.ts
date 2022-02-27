import { Request, Response, NextFunction } from 'express';
import Controller from './_cities.controller';
import { IData } from '../types/data';

class CitiesDetailsController extends Controller {
  /**
   * @route   GET /api/cities/coord
   * @desc
   */
  getCity = async (req: Request, res: Response, next: NextFunction) => {
    await this.getCityCoord(req, next, 'get-city');
    const data: IData = {
      city: this.cityData,
    };
    return next(this.response.success(200, data, this.messageServices.success('city')));
  };
}

export default new CitiesDetailsController();
