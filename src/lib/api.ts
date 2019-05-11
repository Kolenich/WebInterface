import { session } from './session';
import { AxiosResponse, AxiosPromise, AxiosError } from 'axios';

export default {
  getContent<dataType>(table: string, sendData?: dataType): AxiosPromise<dataType> {
    return new Promise<AxiosResponse<dataType>>((resolve, reject) => {
      let data = sendData;
      if (!sendData) data = {} as dataType;
      session
        .get<dataType>(`api/${table}/`, { data })
        .then((response: AxiosResponse) => resolve(response))
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },
  sendContent<dataType>(table: string, sendData: dataType, id: number, sendMethod?: string):
    AxiosPromise<dataType> {
    return new Promise<AxiosResponse<dataType>>((resolve, reject) => {
      let method = sendMethod;
      let data = sendData;
      if (!method) method = 'post';
      if (!data) data = {} as dataType;
      session({ method, data, url: `api/${table}/${id}/` })
        .then((response: AxiosResponse) => resolve(response))
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },
};
