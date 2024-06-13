/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest } from 'next';
import type { NextApiResponseWithSocket } from './api-typings';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseWithSocket
) {

     
    const data = await req.body;
    try {
        res.socket.server.io?.emit('ack-event', data);
        res.status(200).json({});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing the request." });
    } finally {
        await prisma.$disconnect();
    }
}