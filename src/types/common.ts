import {AxiosError} from 'axios';

export type PercentString = `${number}%`;
export type Size = number | PercentString;
export type AnyObject = {[key: string]: any};
export type ApiResponse = {
  code: number;
  message: string;
};
export type ResponseData<D> = ApiResponse & {
  data?: D;
};
export type AppAxiosError = AxiosError<
  ApiResponse & {
    data?: AnyObject;
  }
>;
