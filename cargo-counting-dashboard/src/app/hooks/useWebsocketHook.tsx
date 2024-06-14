import { type AppEventEnum } from "~/pages/api/api-typings";
import { useApplicationContext } from "../context";
import { useCallback } from "react";

const useWebSocketConnectionHook = (event: AppEventEnum, cb: (arg: unknown) => void) => {

  const { state } = useApplicationContext();

  useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (state && state?.webSocketData && state?.webSocketData?.event === event) {
      cb(state?.webSocketData);
    }

    

  }, [state]); // Include event and cb in the dependency array

}

export default useWebSocketConnectionHook
