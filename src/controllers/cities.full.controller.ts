import { Request, Response, NextFunction } from 'express';
import Controller from './_cities.controller';
import { ICityDetails, IWeatherFull, IBusinessFull, IData } from '../types/data';

class CitiesFullController extends Controller {
  getFullCityWeatherAndBusiness = async (req: Request, res: Response, next: NextFunction) => {
    await this.getCityCoord(req, next, 'get-full-city');
    const { lat, lon }: Pick<ICityDetails, 'lat' | 'lon'> = this.cityData;

    const weather = (await this.getWeatherSlice(lat, lon, next)) as IWeatherFull;
    const business = (await this.getBusinessSlice(lat, lon, next)) as IBusinessFull[];
    if (!weather || !business) {
      return next(this.response.error(500, null, this.messageServices.error('full')));
    }

    const data: IData = {
      city: this.cityData,
      weather,
      business,
    };

    return next(this.response.success(200, data, this.messageServices.success('full')));
  };
}

export default new CitiesFullController();
