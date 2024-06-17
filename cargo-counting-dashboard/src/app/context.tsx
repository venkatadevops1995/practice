/* eslint-disable react/display-name */
"use client";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, {
  type Dispatch,
  createContext,
  useContext,
  useReducer,
  useMemo,
} from "react";
import { type POResponseType, AppEventEnum } from "~/pages/api/api-typings";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorDialog from "./components/ErrorDialog";
import LoaderProvider from "./LoaderProvider";


export type GlobalState = {
  liveCountData: POResponseType | null;
  runtime_env: string | null;
  error: any;
  selectedActiveData: POResponseType | null;
  ack_data: any;
  loader: { state: boolean; text?: string } | null;
  webSocketData: any;
};

export type ApplicationType = {
  state: GlobalState;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  dispatch: Dispatch<{type: AppEventEnum, payload: GlobalState | any}>;
};

type LiveCountEvent = {
  type: AppEventEnum.LIVE_COUNT;
  payload: POResponseType | null;
};

type RunTimeEnvEvent = {
  type: AppEventEnum.RUN_TIME_ENV;
  payload: string | null;
};

type ErrorEvent = {
  type: AppEventEnum.ERROR;
  payload: any;
};

type LoaderEvent = {
   type: AppEventEnum.LOADER;
   payload: { state: boolean; text?: string }
};

export type AppEvent = LiveCountEvent | RunTimeEnvEvent | ErrorEvent | LoaderEvent;

const applicationContext = createContext<ApplicationType | undefined>(undefined);

const useApplicationContext = () => {
  const context = useContext(applicationContext);
  if (context === undefined) {
    throw new Error("Application Context is undefined");
  }

  return context;
};

const reducer = (state: GlobalState, action: AppEvent): GlobalState => {
  switch (action.type as any) {
    case AppEventEnum.LIVE_COUNT:
      return { ...state, liveCountData: action.payload };
    case AppEventEnum.ACK_EVENT:
      return { ...state, ack_data: action.payload };
    case AppEventEnum.SELCTED_LIVE_DATA:
      return { ...state, selectedActiveData: action.payload };
    case AppEventEnum.RUN_TIME_ENV:
      return { ...state, runtime_env: action.payload };
    case AppEventEnum.ERROR:
      return { ...state, error: action.payload };
    case AppEventEnum.WEBSOCKET_EVENT:
      return { ...state, webSocketData: action.payload };
    case AppEventEnum.LOADER:
      return { ...state, loader: { state: action.payload.state, text: action.payload.text } };
    default:
      return state;
  }
};

const ApplicationProvider = React.memo(({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());
    

  const initialState: GlobalState = {
    liveCountData: null,
    runtime_env: null,
    error: null,
    loader: null,
    selectedActiveData: null,
    ack_data: null,
    webSocketData: null
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <applicationContext.Provider value={contextValue}>
        {children}
        <LoaderProvider/>
        <ErrorDialog/>
      </applicationContext.Provider>
    </QueryClientProvider>
  );
});

export { ApplicationProvider, useApplicationContext };
