import { session } from './session';
import { AxiosResponse, AxiosPromise, AxiosError } from 'axios';

export default {
  getContent<dataType>(requestUrl: string, sendData?: dataType): AxiosPromise<dataType> {
    return new Promise<AxiosResponse<dataType>>((resolve, reject) => {
      let data = sendData;
      if (!sendData) data = {} as dataType;
      session
        .get<dataType>(`api/${requestUrl}/`, { data })
        .then((response: AxiosResponse) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  },
  sendContent<dataType>(requestUrl: string, sendData: dataType, id?: number, sendMethod?: string):
    AxiosPromise<dataType> {
    return new Promise<AxiosResponse<dataType>>((resolve, reject) => {
      let method = sendMethod;
      let data = sendData;
      let url: string = `api/${requestUrl}/${id}/`;
      if (!method) method = 'post';
      if (!data) data = {} as dataType;
      if (!id) url = `api/${requestUrl}/`;
      session({ method, data, url })
        .then((response: AxiosResponse) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  },
};
