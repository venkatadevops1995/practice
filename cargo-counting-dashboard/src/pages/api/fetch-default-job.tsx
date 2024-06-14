/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest } from 'next'
import { type NextApiResponseWithSocket } from './api-typings';
 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
 

  let statusCode = 200;
  let messsage;
  const job_id = "test_job";

  try {
    const apiRes = await fetch(`${process.env.SERVER_RAY_PIPELINE_URL}`,{
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
      }
    })
    const result = await apiRes.json() as any[];
    statusCode = apiRes.status;
    messsage = apiRes.statusText;
    const findJob = result?.find(job=> {
      return job?.entrypoint?.includes(job_id)
       
    })


    messsage = findJob;
  } catch(e) {
    console.log(e)
     statusCode = 500;
     messsage = 'internal server error';

  }
  res.status(statusCode).json({ ...messsage })
}