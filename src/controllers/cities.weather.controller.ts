import { Request, Response, NextFunction } from 'express';
import Controller from './_cities.controller';
import { ICityDetails, IWeatherFull, IData } from '../types/data';

class CitiesWeatherController extends Controller {
  getWeather = async (req: Request, res: Response, next: NextFunction) => {
    await this.getCityCoord(req, next, 'get-weather');
    const { lat, lon }: Pick<ICityDetails, 'lat' | 'lon'> = this.cityData;

    const weather = (await this.getWeatherSlice(lat, lon, next)) as IWeatherFull;

    const data: IData = {
      weather,
    };

    return next(this.response.success(200, data, this.messageServices.success('weather')));
  };
}

export default new CitiesWeatherController();
