import { Request, Response, NextFunction } from 'express';
import Controller from './_cities.controller';
import { ICityDetails, IWeather, IBusiness, IData } from '../types/data';

type Order = 'asc' | 'desc';

class CitiesModController extends Controller {
  modBusiness = async (
    businessData: IBusiness[],
    reviewCount: number,
    searchName: string,
  ): Promise<void | IBusiness[]> => {
    return businessData
      .map(({ name, is_closed, review_count, rating, phone, distance }: IBusiness) => {
        return {
          name,
          is_closed,
          review_count,
          rating,
          phone,
          distance,
        };
      })
      .filter((business: IBusiness) => business.review_count > reviewCount)
      .filter((business: IBusiness) => {
        if (business.name.toLowerCase().includes(searchName.toLowerCase())) {
          return business;
        }
        return null;
      });
  };

  orderByDistance = (business: IBusiness[], order: Order) => {
    return business.sort((a, b) => (order === 'desc' ? b.distance - a.distance : a.distance - b.distance));
  };

  getModCityWeatherAndBusiness = async (req: Request, res: Response, next: NextFunction) => {
    await this.getCityCoord(req, next, 'get-mod-city');
    const { lat, lon }: Pick<ICityDetails, 'lat' | 'lon'> = this.cityData;

    const reviewCount = (req.query.reviewCount as unknown as number) || 0;
    const searchName = (req.query.searchName as unknown as string) || '';
    const distanceOrder = (req.query.distanceOrder as unknown as Order) || '';

    const weatherData = (await this.getWeatherSlice(lat, lon, next)) as IWeather;
    const businessData = (await this.getBusinessSlice(lat, lon, next)) as IBusiness[];
    if (!weatherData || !businessData) {
      return next(this.response.error(500, null, this.messageServices.error('mod')));
    }

    const businessMod = (await this.modBusiness(businessData, Number(reviewCount), searchName)) as IBusiness[];

    const { weather, main, visibility, wind }: IWeather = weatherData;

    const data: IData = {
      city: this.cityData,
      weather: { weather, main, visibility, wind },
      business: distanceOrder ? this.orderByDistance(businessMod, distanceOrder) : businessMod,
    };

    return next(this.response.success(200, data, this.messageServices.success('mod')));
  };
}

export default new CitiesModController();
