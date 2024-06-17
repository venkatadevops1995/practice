/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Image, useToast } from "@chakra-ui/react";
import CountCard from "./CountCard";
import { AppEventEnum, type PORequestType, type POResponseType } from "~/pages/api/api-typings";
import React from "react";
import AlertDialogBox from "../../components/Alerts";
import { useRouter, useSearchParams } from "next/navigation";
import { useApplicationContext } from "~/app/context";
import { defaultJob, stopJobHandler } from "../_RequestHandlers/live-request-handler";
import { startStopCountRequestHandler } from "../_RequestHandlers/create-po-request-handler";
import { useMutation, useQuery } from "@tanstack/react-query";
import useHttpClientHandler from "~/app/hooks/useHttpLoader";
import GoBackBtn from '~/app/components/BackBtn'
import useWebSocketConnectionHook from "~/app/hooks/useWebsocketHook";
import { type AckEventType } from "../typings/cargo-typings";
import { useJustandStore } from "~/app/justand";

const CargoLivePage = () => {
  const { state, dispatch } = useApplicationContext()
  const  {onWebSocketClear} = useJustandStore()

  const toast = useToast();
  const { setLoader, setError } = useHttpClientHandler()
  const [getCargoEvent, setCargoEvent] = useState<POResponseType>();
  const alertRef = useRef<any>(null);
  const [isJobCanceled, setJobCanceled] = useState<boolean>(false);
  const route = useRouter();
  const params = useSearchParams();
  const onAskUserConfirmation = () => {
    alertRef?.current?.onOpen()
  }




  const requestJobMutation = useMutation({
    mutationFn: () => startStopCountRequestHandler(getCargoEvent?.po_number ?? getCargoEvent?.poNumber ?? '', 'stop', state?.runtime_env),
    onSuccess: (startResponse) => {

      if ([200, 201].includes(startResponse.status)) {
        const startPayload: PORequestType = {
          startAt: '',
          endAt: new Date().getTime() + '',
          isActive: false,
          po_number: getCargoEvent?.po_number ?? getCargoEvent?.poNumber + '',
          count: 0
        }
        setJobCanceled(true);
        alertRef?.current?.onClose();
        dispatch({ type: AppEventEnum.LIVE_COUNT, payload: startPayload })
        stopJobMutation.mutate(startPayload)
      }
    },
    onError: (err) => {
      setLoader(false);
      alertRef?.current?.onClose();
      setError(err)
      console.log("error", err)
    }
  })

  const stopJobMutation = useMutation({
    mutationFn: (startPayload: PORequestType) => stopJobHandler(startPayload),
    onSuccess: (saveResponse) => {
      if ([200, 201].includes(saveResponse.status)) {
        setLoader(false);
        route.push('/create-po')
      }
    },
    onError: (err) => {
      setLoader(false);
      setError(err)
      alertRef?.current?.onClose();
      console.log("error", err)
    }
  })
  const onHandleClose = async () => {

    alertRef?.current?.onClose();
  }

  const onHandleConfirm = async () => {
    setLoader(true);
    alertRef?.current?.onClose();
    requestJobMutation.mutate();

  }
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['getDefaultJob'],
    queryFn: defaultJob,
  })
  useEffect(() => {
    if (isPending) {
      setLoader(true)
    }
    if (isError || error) {
      setLoader(false)
      setError(error)
    }
  }, [isPending, isError, error, dispatch])

  useEffect(() => {
    if (data) {
      dispatch({
        type: AppEventEnum.RUN_TIME_ENV,
        payload: data.data?.runtime_env,
      })
      setLoader(false)
    }
  }, [data, dispatch])



  // After navigate check is the same id else redirect to job creation page
  useEffect(() => {
    if (state?.selectedActiveData) {
      setCargoEvent(state?.selectedActiveData ?? undefined)
    }
    else {
      route.push('/create-po')
    }
    return () => {
      dispatch({ type: AppEventEnum.SELCTED_LIVE_DATA, payload: null })
    }
  }, [params])




  const onLiveEvent = (data: POResponseType) => {
    if (data) {
      const getId = params?.get('active');
      if (getId === data?.poNumber) {
        setCargoEvent(data ?? undefined)
      }
    }
  }


  useEffect(()=>{
      return  ()=> {
       onWebSocketClear(null)
    }
  },[])

  // Subscripbe for live count
  useWebSocketConnectionHook(AppEventEnum.LIVE_COUNT, (data) => onLiveEvent(data as POResponseType));
    const onAckEvent = (data: AckEventType) => {
      toast({
        title: `${data?.message}`,
        position: 'top',
        isClosable: true,
        variant: '',
        containerStyle: {
          background: 'var(--overlay-bg)',
          borderRadius: '8px'

        }
      })
  }



  
  useWebSocketConnectionHook(AppEventEnum.ACK_EVENT, onAckEvent);


  return (
    <div className="grid w-full  overflow-auto grid-rows-[max-content,minmax(0,1fr)]">
      <div className="flex h-[50px] w-full gap-x-2 items-center justify-start">
        <GoBackBtn title={''} path={"/create-po"} />
        <Image src="/images/live_icon.svg" alt="live" /> <span className="h-max w-full desktop:text-[24px] mobile:text-[16px] tablet:text-[16px] font-isb font-[500]">Cargo Live</span>
      </div>
      <div className="grid h-full w-full gap-y-[20px]  grid-rows-[max-content,1fr,max-content]]">
        <div className="h-max relative mobile:justify-center w-full flex text-[24px] font-[500] mt-[20px]">
          <CountCard liveData={getCargoEvent} />
        </div>
        <div className="grid w-full h-full justify-center items-center">
          <Image aspectRatio={16 / 9} objectFit={'cover'} width={'100%'} height={'100%'} src={'/images/cargo_live_img.svg'} alt="cargo live image" />
        </div>
        <div className="grid w-full h-full items-end  justify-center">
          <Button
            onClick={onAskUserConfirmation}
            type="submit"
            width={'280px'}
            alignSelf={'center'}
            height={'42px'}
            borderRadius={'10px'}
            bg={'var(--app-btn-cancel)'}
            _hover={{ background: 'var(--app-btn-cancel)' }}

            className={`${!isJobCanceled ? '' : 'no-ptr'}`}
          >
            Stop
          </Button>
        </div>
      </div>

      <AlertDialogBox ref={alertRef} title="Confirmation Message" message="Do you want to Stop the Counting ?">



        <div className="flex gap-x-[30px]">
          <Button
            onClick={onHandleClose}
            type="submit"
            alignSelf={'center'}
            height={'40px'}
            borderRadius={'4px'}
            bg={'var(--app-btn-close)'}
            className={`${true ? '' : 'no-ptr'}`}
          >
            Cancel
          </Button>

          <Button
            onClick={onHandleConfirm}
            type="submit"
            alignSelf={'center'}
            height={'40px'}
            borderRadius={'4px'}
            bg={'var(--app-btn-bg)'}
            className={`${true ? '' : 'no-ptr'}`}
          >
            Confirm
          </Button>
        </div>
      </AlertDialogBox>
    </div>
  );
};
export default React.memo(CargoLivePage)