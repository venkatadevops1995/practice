"use server";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest } from 'next'
import { type NextApiResponseWithSocket, type PORequestType } from './api-typings';
 

const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {


 
  const reqData:PORequestType = await req.body as PORequestType;

  
  const isRecordExists  = await prisma.cargoCount.findFirst({
    where: {
      poNumber: reqData?.po_number
    }
  })

  
  const record = await prisma.cargoCount.update({
  data: {
        endAt: reqData?.endAt,
        isActive: false
  },
    where: {
        id: isRecordExists?.id,
        poNumber: reqData?.po_number
    }
})
   
      

     return res.status(200).json({ message: 'job stopped' })
}