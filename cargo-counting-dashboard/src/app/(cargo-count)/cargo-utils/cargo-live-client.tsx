import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useCheckCargoLiveFromClient =   ()=> {
      const router = useRouter();

      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useCallback(()=> {
        const fun = async ()=> {
            const response =    (await fetch('/api/get-live-data'))
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const result = await response?.json();
            if (result?.isActive) {
               router.push('/live')
            } else {
               router.push('/create-po')
            }
             
        
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fun()
      }, [])

    }


export default useCheckCargoLiveFromClient;
