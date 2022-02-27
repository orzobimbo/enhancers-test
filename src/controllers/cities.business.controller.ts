import { Request, Response, NextFunction } from 'express';
import Controller from './_cities.controller';
import { ICityDetails, IBusinessFull, IData } from '../types/data';

class CitiesBusinessController extends Controller {
  getBusiness = async (req: Request, res: Response, next: NextFunction) => {
    await this.getCityCoord(req, next, 'get-business');
    const { lat, lon }: Pick<ICityDetails, 'lat' | 'lon'> = this.cityData;

    const business = (await this.getBusinessSlice(lat, lon, next)) as IBusinessFull[];

    const data: IData = {
      business,
    };

    return next(this.response.success(200, data, this.messageServices.success('business')));
  };
}

export default new CitiesBusinessController();
