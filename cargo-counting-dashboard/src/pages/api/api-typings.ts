import type { Server as HTTPServer } from "http"
import type { Socket as NetSocket } from "net"
import { type NextApiResponse } from "next";
import type { Server as IOServer } from "socket.io"

export type PORequestType = {
    startAt: string;
    endAt:string;
    isActive:boolean
    po_number:string;
    count: number;
} 


export type POResponseType  =  Exclude<PORequestType, 'po_number'> & {poNumber: string};


export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

export interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer
}


export enum WebsocketEventEnum {
  LIVE_COUNT='live-count',
  RUN_TIME_ENV = "run_time_env"
}