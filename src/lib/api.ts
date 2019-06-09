import { session } from './session';
import { AxiosResponse, AxiosPromise, AxiosError } from 'axios';
import { HTTPMethods } from './types';

export default {
  getContent<dataType>(requestUrl: string, sendData?: dataType): AxiosPromise<dataType> {
    return new Promise<AxiosResponse<dataType>>((resolve, reject) => {
      let data = sendData;
      if (!sendData) data = {} as dataType;
      session
        .get<dataType>(`api/${requestUrl}/`, { data })
        .then((response: AxiosResponse<dataType>) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  },
  sendContent<dataType>(requestUrl: string, sendData: dataType, sendMethod?: HTTPMethods):
    AxiosPromise<dataType> {
    return new Promise<AxiosResponse<dataType>>((resolve, reject) => {
      let method = sendMethod;
      if (!method) method = 'post';
      const data: dataType = sendData;
      const url: string = `api/${requestUrl}/`;
      session({ method, data, url })
        .then((response: AxiosResponse<dataType>) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  },
};
