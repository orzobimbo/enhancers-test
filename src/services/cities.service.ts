import axios from 'axios';
import { config } from 'dotenv-safe';

config();

export default class CitiesServices {
  private apiDomain = `http://api.openweathermap.org/`;

  private OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

  private YELP_AUTH_TOKEN = process.env.YELP_AUTH_TOKEN;

  public test = 'ciao';

  // eslint-disable-next-line class-methods-use-this
  testData = async () => {
    return 'test';
  };

  getCityData = async (city: string, country: string) => {
    const url = `${this.apiDomain}geo/1.0/direct?q=${encodeURI(city)},${country}&limit=1&appid=${
      this.OPENWEATHERMAP_API_KEY
    }`;
    const { data } = await axios.get(url);

    if (data.length === 0) {
      return false;
    }
    const { name, lat, lon, nation, state } = data[0];
    return { name, lat, lon, country: nation, state };
  };

  getWeatherData = async (lat: number, lon: number) => {
    const url = `${this.apiDomain}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.OPENWEATHERMAP_API_KEY}`;
    const result = await axios.get(url);
    return result.data;
  };

  getBusinessData = async (lat: number, lon: number) => {
    const instance = axios.create({
      baseURL: `https://api.yelp.com/v3`,
    });

    instance.defaults.headers.common['Authorization'] = `Bearer ${this.YELP_AUTH_TOKEN}`;

    const result = await instance.get(`/businesses/search?term=delis&latitude=${lat}&longitude=${lon}`);

    return result.data.businesses;
  };
}
