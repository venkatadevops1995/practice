/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { Input, Image, Button } from '@chakra-ui/react'
import { type ChangeEvent, useState } from 'react'
import React from 'react'
import { type PORequestType } from '~/pages/api/api-typings'
import { saveAfterJobStarted, startStopCountRequestHandler } from '../_RequestHandlers/create-po-request-handler'
import { useRouter } from 'next/navigation'
import { useApplicationContext } from '~/app/context'
import { useMutation } from '@tanstack/react-query'
import useHttpLoader from '~/app/hooks/useHttpLoader'

const CargoInputComponent = ({ close, title }: { close: (arg: unknown) => void, title?: string }) => {

  const [isFormValid, setFormValid] = useState<boolean>(false)
  const { state } = useApplicationContext()
  const [getPo, setPo] = useState<string>()
  const router = useRouter()
  const {setLoader} = useHttpLoader()

  const onPoNumberInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const po_number = e.target.value
    setPo(po_number)
    setFormValid(!po_number)
  }

  const startJobMutation = useMutation({
    mutationFn: () => startStopCountRequestHandler(getPo ?? '', 'start', state.runtime_env),
    onSuccess: (startResponse) => {
      if ([200, 201].includes(startResponse.status)) {
        const startPayload: PORequestType = {
          startAt: new Date().getTime() + '',
          endAt: '',
          isActive: false,
          po_number: getPo as any,
          count: 0
        }
        setLoader(true);
        saveJobMutation.mutate(startPayload)
      }
    },
    onError: (err) => {
      setLoader(false);
      console.log("error", err)
    }
  })

  const saveJobMutation = useMutation({
    mutationFn: (startPayload: PORequestType) => saveAfterJobStarted(startPayload),
    onSuccess: (saveResponse) => {
      if ([200, 201].includes(saveResponse.status)) {
        setLoader(false);
        router.push('/live')
      }
    },
    onError: (err) => {
      setLoader(false);
      console.log("error", err)
    }
  })

  const handlePOSubmission = () => {
    startJobMutation.mutate()
    setLoader(true);
  }

  const onBackButtonClicked = () => {
    close('back')
  }

  return (
    <>
      <div className="mobile:rounded-tl-[24px] mobile:rounded-tr-[24px] tablet:rounded-tl-[0px] tablet:rounded-tr-[0px] p-[20px] max-h-[40vh] w-full flex flex-col gap-y-[20px] justify-between overflow-auto desktop:bg-white tablet:bg-white mobile:bg-[var(--app-card-body)]">
        {title && <div className="flex justify-between items-center">
          <div className="text-[var(--app-text-clr)]">New Cargo</div>
          <Image
            cursor={'pointer'}
            onClick={close}
            src="images/close_icon.svg"
            alt="close"
          />
        </div>}
        <div className="flex flex-col gap-y-[2px]">
          <span className="font-[600] text-[var(--app-text-clr)] opacity-[0.55]">
            PO Number
          </span>
          <Input
            bg={'white'}
            autoFocus={false}
            color={'var(--app-text-clr)'}
            placeholder="eg:HID234234"
            name="po_number"
            onChange={onPoNumberInputChange}
          />
        </div>

        <div className='mobile:flex flex flex-1 desktop:hidden tablet:hidden'>
          <Button
            onClick={handlePOSubmission}
            type="submit"
            width={'100%'}
            height={'42px'}
            borderRadius={'8px'}
            alignSelf={'center'}
            _hover={{ background: 'var(--app-btn-bg)' }}
            bg={'var(--app-btn-bg)'}
            className={`${!isFormValid ? '' : 'no-ptr'}`}
          >
            Start
          </Button>
        </div>
        <div className='flex-1 gap-x-[15px] mobile:hidden desktop:flex tablet:flex'>
          <Button
            type="submit"
            width={'100%'}
            height={'42px'}
            borderRadius={'8px'}
            onClick={onBackButtonClicked}
            _hover={{ background: 'var(--app-btn-close)' }}
            alignSelf={'center'}
            bg={'var(--app-btn-close)'}
          >
            Back
          </Button>
          <Button
            onClick={handlePOSubmission}
            type="submit"
            width={'100%'}
            height={'42px'}
            borderRadius={'8px'}
            alignSelf={'center'}
            _hover={{ background: 'var(--app-btn-bg)' }}
            bg={'var(--app-btn-bg)'}
            className={`${!isFormValid ? '' : 'no-ptr'}`}
          >
            Start
          </Button>
        </div>
      </div>
    </>
  )
}

export default React.memo(CargoInputComponent)
