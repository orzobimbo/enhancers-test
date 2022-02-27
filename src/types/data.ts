export interface ICoord {
  lat: number;
  lon: number;
}

export interface ICityDetails extends ICoord {
  name: string;
  state: string;
}

export interface IWeather {
  weather: { id: number; main: string; description: string; icon: string };
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number };
  visibility: number;
  wind: { speed: number; deg: number };
}

export interface IWeatherFull extends IWeather {
  coord: ICoord;
  base: string;
  clouds: { all: number };
  dt: number;
  sys: { type: number; id: number; country: string; sunrise: number; sunset: number };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ILocation {
  address1: string;
  address2: string | null;
  address3: string | null;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: [string, string, string];
}

export interface IBusiness {
  name: string;
  is_closed: boolean;
  review_count: number;
  rating: number;
  phone: number;
  distance: number;
}

export interface IBusinessFull extends IBusiness {
  id: string;
  alias: string;
  image_url: string;
  url: string;
  categories: { alias: string; title: string }[];
  coordinates: ICoord;
  transactions: [];
  price: string;
  location: ILocation;
  display_phone: number;
}

export interface IData {
  city?: ICityDetails;
  weather?: IWeather | IWeatherFull;
  business?: IBusiness[] | IBusinessFull[];
}
