import axios from "axios";
import { type PORequestType } from "~/pages/api/api-typings";

 const stopJobHandler = async (payload: PORequestType)=> { 

  return axios.post('/api/stop-job/', payload)
  .then(function (response) {
     return response;
  })
  .catch(function (error) {
   return  Promise.reject(error)
  });
  }



export {stopJobHandler}
