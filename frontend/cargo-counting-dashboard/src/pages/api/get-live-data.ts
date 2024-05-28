import { PrismaClient } from '@prisma/client';
import type { NextApiRequest } from 'next'
import { type NextApiResponseWithSocket } from './api-typings';
 

const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
 
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const countRecord = await prisma.poCounts.findFirst({
    where: {
       isActive: true
    }
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  res.status(200).json({ ...countRecord })
}