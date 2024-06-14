import { type AppEventEnum } from "~/pages/api/api-typings";
import { useApplicationContext } from "../context";
import { useCallback, useEffect } from "react";
import { useJustandStore } from "../justand";

const useWebSocketConnectionHook = (event: AppEventEnum, cb: (arg: unknown) => void) => {
  const  websocketData = useJustandStore((state)=>state.websocketData)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (websocketData  && websocketData?.event === event) {
      cb(websocketData);
    }
  }, [websocketData]); // Include event and cb in the dependency array

}

export default useWebSocketConnectionHook
