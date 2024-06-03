/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest } from 'next'
import { type NextApiResponseWithSocket, type PORequestType } from './api-typings';
 

const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
 
  const reqData:PORequestType = JSON.parse(JSON.stringify(await req.body as PORequestType));

  
  const isRecordExists  = await prisma.cargoCount.findFirst({
    where: {
      poNumber: reqData?.po_number
    }
  })
  
  if(!isRecordExists) {
     return res.status(204).json({ message: '' })
  }
  
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

console.log(record,"hey")


     res.socket.server.io?.emit('live-count',record);  
     return res.status(200).json({ message: '' })
}