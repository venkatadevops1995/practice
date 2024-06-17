import axios from "axios";
import { type PORequestType } from "~/pages/api/api-typings";

 const stopJobHandler = async (payload: PORequestType)=> { 

  return await axios.post('/api/stop-job/', payload)
 
  }


const defaultJob = async () => {
    const response = await axios.get('/api/fetch-default-job')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return response
  }


export {stopJobHandler,defaultJob}


