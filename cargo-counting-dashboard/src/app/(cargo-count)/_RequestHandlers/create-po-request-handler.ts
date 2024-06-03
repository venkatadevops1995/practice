/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type PORequestType } from '~/pages/api/api-typings';
import { type CreatePoPayload } from '../typings/cargo-typings';
import axios, { type AxiosResponse } from 'axios';

const startCountRequestHandler = async (payload: CreatePoPayload): Promise<AxiosResponse<any, any>> => {
  return axios.post('/api/start-job', payload)
  .then(function (response) {
     return response
  })
  .catch(function (error) {
   // eslint-disable-next-line @typescript-eslint/unbound-method
   return  Promise.reject(error)
  });
};

const saveAfterJobStarted = async (payload: PORequestType): Promise<AxiosResponse<any, any>> => {

  return axios.post('/api/live-po-count/', payload)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      return Promise.reject(error);
    });
};

export { startCountRequestHandler, saveAfterJobStarted };
