import {create} from 'zustand'
import { type OpenViduServerConnectionConfig, type Connection, type SessionObject } from '../typings/openvidu-typings'





export interface OpenViduState {
  sessionObject?: SessionObject
  tokenCollection: Connection[]
  tokenCollectionMain: Connection[]
  tokenCollectionForPinnedStream: Connection[]
  cameraPublishNotification: boolean
  openViduServerConnectionConfig?: OpenViduServerConnectionConfig
  setTokenCollection: (connections: Connection[]) => void
  setTokenCollectionMain: (connections: Connection[]) => void
  setTokenCollectionForPinnedStream: (connections: Connection[]) => void
  setCameraPublishNotification: (status: boolean) => void
  setOpenViduServerConnectionConfig: (config: OpenViduServerConnectionConfig) => void
}

const useOpenViduState = create<OpenViduState>((set) => ({
  sessionObject: undefined,
  tokenCollection: [],
  tokenCollectionMain: [],
  tokenCollectionForPinnedStream: [],
  cameraPublishNotification: false,
  openViduServerConnectionConfig: undefined,
  setTokenCollection: (connections) => set(() => ({ tokenCollection: connections })),
  setTokenCollectionMain: (connections) => set(() => ({ tokenCollectionMain: connections })),
  setTokenCollectionForPinnedStream: (connections) => set(() => ({ tokenCollectionForPinnedStream: connections })),
  setCameraPublishNotification: (status) => set(() => ({ cameraPublishNotification: status })),
  setOpenViduServerConnectionConfig: (config) => set(() => ({ openViduServerConnectionConfig: config })),
}))

export default useOpenViduState
