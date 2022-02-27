import { Request, NextFunction } from 'express';
import HttpResponse from '../core/http-response';
import CitiesServices from '../services/cities.service';
import ParamsServices from '../services/params.service';
import MessagesServices from '../services/messages.service';

import { ICityDetails, IWeatherFull, IBusinessFull, IData } from '../types/data';

abstract class Controller {
  protected response = new HttpResponse('cities');

  protected city = '';

  protected country = '';

  protected cityData!: ICityDetails;

  constructor(
    protected readonly citiesServices: CitiesServices = new CitiesServices(),
    protected readonly paramsServices: ParamsServices = new ParamsServices(),
    protected readonly messageServices: MessagesServices = new MessagesServices(),
  ) {}

  getParams = (req: Request) => {
    const parametri = { ...req.params, ...req.query };

    const { city, country } = parametri;

    this.city = city as string;
    this.messageServices.setCity(this.city);
    this.country = country as string;
    this.country = this.country.toUpperCase();
  };

  async getCityCoord(req: Request, next: NextFunction, operation: string) {
    req.userAction = this.response.setOperation(operation);

    try {
      const errors = ParamsServices.isValidParams(req);

      if (errors) {
        next(this.response.errors(errors));
      }
      this.getParams(req);
    } catch (error: any) {
      return next(this.response.error(500, null, error.message));
    }

    let cityData;
    try {
      cityData = (await this.citiesServices.getCityData(this.city, this.country)) as ICityDetails;
    } catch (error) {
      return next(this.response.error(500, null, this.messageServices.error('coord', 'B')));
    }

    if (!cityData) {
      return next(this.response.error(500, null, this.messageServices.error('city', 'C')));
    }

    this.cityData = cityData;
  }

  getWeatherSlice = async (lat: number, lon: number, next: NextFunction): Promise<void | IWeatherFull> => {
    let weatherData;
    try {
      weatherData = (await this.citiesServices.getWeatherData(lat, lon)) as IWeatherFull;
    } catch (error) {
      return next(this.response.error(500, null, this.messageServices.error('weather')));
    }
    return weatherData;
  };

  getBusinessSlice = async (lat: number, lon: number, next: NextFunction): Promise<void | IBusinessFull[]> => {
    let businessData;
    try {
      businessData = (await this.citiesServices.getBusinessData(lat, lon)) as IBusinessFull[];
    } catch (error) {
      return next(this.response.error(500, null, this.messageServices.error('business')));
    }
    return businessData;
  };
}

export default Controller;
