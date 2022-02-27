import { IData } from './data';

export type TSeverity = 'success' | 'note' | 'warning' | 'error';

export interface IInfo {
  scope: string;
  operation: string;
  statusCode: number;
  severity: TSeverity;
  message: string;
}

// export interface TData = IData | null;
export type TData = IData | null;

export interface IHttpResponse {
  successful: boolean;
  info: IInfo;
  data: TData;
}

export interface IParams {
  city: string;
  country: string;
}
