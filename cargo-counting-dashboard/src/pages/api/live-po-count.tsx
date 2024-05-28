import { PrismaClient } from '@prisma/client';
import type { NextApiRequest } from 'next'
import { type NextApiResponseWithSocket, type PORequestType } from './api-typings';
 

const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
 
  const reqData:PORequestType = req.body as PORequestType;

  // check if popWas Already Exists 
  const isRecordExists  = await prisma.poCounts.findFirst({
    where: {
      poNumber : reqData?.po_number ?? null
    }
  })
  if(isRecordExists) { 
    const countRecord = await prisma.poCounts.update({
        where: {
          id: isRecordExists.id,
        },
      data: {
      startAt: reqData?.startAt,
      endAt: reqData?.endAt,
      poNumber: reqData?.po_number ?? null,
      isActive: reqData?.endAt===null || reqData?.endAt===undefined,
      count: reqData?.count
  },
});
  res.socket.server.io?.emit('live-count',countRecord);  
  return res.status(200).json({ message: countRecord })

  }
  // If not present then add new record
  const countRecord = await prisma.poCounts.create({
  data: {
   startAt: reqData?.startAt,
   endAt: reqData?.endAt,
   poNumber: reqData?.po_number ?? null,
   isActive: reqData?.endAt===null || reqData?.endAt===undefined,
   count: reqData?.count
  },
});

  res.socket.server.io?.emit('live-count',countRecord);
  res.status(200).json({ message: countRecord })
}