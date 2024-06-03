/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest } from 'next'
import { type NextApiResponseWithSocket } from './api-typings';
import { NextResponse } from 'next/server';
 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
 
     return NextResponse.rewrite('../../../run.sh')
}