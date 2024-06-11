"use client";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, {
  type Dispatch,
  createContext,
  useContext,
  useReducer,
} from "react";
import { type POResponseType, AppEventEnum } from "~/pages/api/api-typings";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HttpLoader from "./components/Loader";
import ErrorDialog from "./components/ErrorDialog";
import useWebSocketConnectionHook from "./hooks/useWebsocketHook";



export type GlobalState = {
  liveCountData: POResponseType | null;
  runtime_env: string | null;
  error: any;
  loader: { state: boolean; text?: string } | null;
};

export type ApplicationType = {
  state: GlobalState;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  dispatch: Dispatch<any>;
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
}

export type AppEvent = LiveCountEvent | RunTimeEnvEvent | ErrorEvent | LoaderEvent;



const applicationContext = createContext<ApplicationType | undefined>(
  undefined,
) 

const useApplicationContext = () => {
  const context = useContext(applicationContext);
  if (context === undefined) {
    throw new Error("Application Context is undefined");
  }

  return context;
};

const reducer = (state: GlobalState, action: any):GlobalState => {

  switch (action.type) {

    case AppEventEnum.LIVE_COUNT:
        
       return  {
          ...state,
          liveCountData: action.payload
       }
     case AppEventEnum.RUN_TIME_ENV:
        
       return  {
          ...state,
          runtime_env: action.payload
       }

    case AppEventEnum.ERROR:
      return  {
        ...state,
        error: action.payload
      }

      case AppEventEnum.LOADER:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return  {
        ...state,
         loader: {
           state: action.payload.state,text: action.payload.text
         }
      }

    default:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...state,
      };
  }
};

// Create the Wrapper Provider

const ApplicationProvider = ({ children }: { children: React.ReactNode }) => {

 const [queryClient] = React.useState(() => new QueryClient());



  const data: GlobalState = {
    liveCountData: null,
    runtime_env: null,
    error: null,
    loader: null
  };
  const [state, dispatch] = useReducer(reducer, data);
 
  useWebSocketConnectionHook((data) => dispatch({ type: AppEventEnum.LIVE_COUNT, payload: data }), AppEventEnum.LIVE_COUNT);  

  return (
    <applicationContext.Provider value={{ state, dispatch }}>
          <QueryClientProvider client={queryClient}>
          {
             state?.loader?.state  &&
             <div className="bg-[var(--http-loader-bg)] fixed w-screen h-screen z-[9999999999]">
             
             </div>
          }
           {
            state?.loader?.state &&
            <HttpLoader/>
           }
           {children}
        <ErrorDialog/>
      </QueryClientProvider>
    </applicationContext.Provider>
  );
};

export { ApplicationProvider, useApplicationContext };
