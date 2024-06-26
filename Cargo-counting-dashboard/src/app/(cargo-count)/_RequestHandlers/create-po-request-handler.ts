/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type PORequestType } from '~/pages/api/api-typings';
import axios, { type AxiosResponse } from 'axios';

const startStopCountRequestHandler = async (id:string,action:string,run_env:any): Promise<AxiosResponse<any, any>> => {

  const payload =  { 
    entrypoint: `python3 main.py '{\"job_id\": \"${id}\", \"op_type\": \"${action}\", \"cam_streaming_url\": \"/home/cargo_data/input_data/2024-05-25_07-40-00.mp4\", \"survey_operation_type\": \"4\"}'`,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    runtime_env: run_env
  }

  const response =  await axios.post('/api/post-start-stop-job', payload)

  return response;
};

const saveAfterJobStarted = async (payload: PORequestType): Promise<AxiosResponse<any, any>> => {

  return await axios.post('/api/live-po-count/', payload)
};


const getAllActiveJobs = async (): Promise<AxiosResponse<any, any>> => {

  return await axios.get('/api/get-all-active-jobs/')
};


export { startStopCountRequestHandler, saveAfterJobStarted , getAllActiveJobs };
