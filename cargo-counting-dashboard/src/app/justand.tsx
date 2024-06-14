import { create } from 'zustand'

type WebsocketData = {
    websocketData: any;
    onEvent:(arg:any)=>void
}

export const useJustandStore = create<WebsocketData>((set) => ({
    websocketData: null,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    onEvent: (agr)=> set((state)=>  ({websocketData: agr}))
}));