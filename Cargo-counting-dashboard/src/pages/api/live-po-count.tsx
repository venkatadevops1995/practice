/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextApiResponseWithSocket, PORequestType } from './api-typings';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  const reqData: PORequestType = req.body as PORequestType;


  try {
    const isRecordExists = await prisma.cargoCount.findUnique({
      where: {
        poNumber: reqData?.po_number,
      },
    });

    const record = await prisma.cargoCount.upsert({
      create: {
        startAt: reqData.startAt,
        endAt: reqData.endAt,
        poNumber: reqData.po_number,
        isActive: true,
        count: +reqData.count,
      },
      update: {
        startAt: reqData.startAt,
        endAt: reqData.endAt,
        poNumber: reqData.po_number,
        count: +reqData.count,
        isActive: isRecordExists?.isActive ?? true,
      },
      where: {
        poNumber: reqData?.po_number,
      },
    });

     res.socket.server.io?.emit('live-count',record);  
    res.status(200).json(record);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  } finally {
    await prisma.$disconnect();
  }
}
