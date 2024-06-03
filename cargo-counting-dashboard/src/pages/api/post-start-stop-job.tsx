/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest } from 'next'
import { type NextApiResponseWithSocket } from './api-typings';
import { type CreatePoPayload } from '~/app/(cargo-count)/typings/cargo-typings';
 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
 
  const reqData:CreatePoPayload = JSON.parse(JSON.stringify(await req.body as  CreatePoPayload)); 

  let statusCode = 200;
  let messsage = ''

  try {
      const res = await fetch('http://172.16.120.98:8265/api/jobs/',{
      method: 'POST',
      body: JSON.stringify(reqData)
    })


    statusCode = res.status;
    messsage = res.statusText;

    

  } catch(e) {
     statusCode = 500;
     messsage = 'internal server error';

  }

   
  res.status(statusCode).json({ message:messsage })
}