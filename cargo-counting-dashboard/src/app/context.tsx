"use client";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, {
  type Dispatch,
  createContext,
  useContext,
  useReducer,
} from "react";
import useWebSocketConnectionHook from "./hooks/useWebsocketHook";
import { type POResponseType, WebsocketEventEnum } from "~/pages/api/api-typings";

export type GlobalState = {
  liveCountData: POResponseType | null;
};

export type ApplicationType = {
  state: GlobalState;
  dispatch: Dispatch<unknown>;
};

const applicationContext = createContext<ApplicationType | undefined>(
  undefined,
);

const useApplicationContext = () => {
  const context = useContext(applicationContext);
  if (context === undefined) {
    throw new Error("Application Context is undefined");
  }

  return context;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {

    case WebsocketEventEnum.LIVE_COUNT:
        
       // eslint-disable-next-line @typescript-eslint/no-unsafe-return
       return  {
          ...state,
          liveCountData: action.payload
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
  const data: GlobalState = {
    liveCountData: null
  };

 

  const [state, dispatch] = useReducer(reducer, data);


   useWebSocketConnectionHook((data) => {
      dispatch({type: WebsocketEventEnum.LIVE_COUNT, payload: data});
   }, WebsocketEventEnum.LIVE_COUNT);

  
  return (
    <applicationContext.Provider value={{ state, dispatch }}>
      {children}
    </applicationContext.Provider>
  );
};

export { ApplicationProvider, useApplicationContext };
