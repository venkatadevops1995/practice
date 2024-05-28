'use client'

import { Input, Image, Button } from '@chakra-ui/react'
import { createPoNumberAction } from './FormActions/CreatePoAction'
import { useFormState } from 'react-dom'
import { type ChangeEvent, useState } from 'react'
import React from 'react'

const initialState = {
  message: '',
}

const CargoInputComponent = ({ close, title }: { close: (arg: unknown) => void  , title?:string}) => {
  const [formState, action] = useFormState(createPoNumberAction, initialState)

  const [isFormValid, setFormValid] = useState<boolean>(false)

  const onPoNumberInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const po_number = e?.target?.value
    setFormValid(!po_number)
  }

  const onBackButtonClicked = ()=> {
    close('back');
  }

  return (
    <>
      <form action={action}>
        <div className="mobile:rounded-tl-[24px] mobile:rounded-tr-[24px] tablet:rounded-tl-[0px] tablet:rounded-tr-[0px] p-[20px] max-h-[40vh] w-full flex flex-col gap-y-[20px] justify-between overflow-auto  desktop:bg-white tablet:bg-white mobile:bg-[var(--app-card-body)]">
         {title && <div className="flex justify-between items-center">
            <div className="text-[var(--app-text-clr)]">New Cargo</div>
            <Image
              cursor={'pointer'}
              onClick={close}
              src="images/close_icon.svg"
              alt="close"
            />
          </div>
}
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
              onChange={(e)=> onPoNumberInputChange(e)}
            />
          </div>

        <div
        className='mobile:flex flex flex-1 desktop:hidden tablet:hidden'
        >
          <Button
            type="submit"
            width={'100%'}
            height={'42px'}
            borderRadius={'8px'}
            alignSelf={'center'}
            bg={'var(--app-btn-bg)'}
            className={`${!isFormValid ? '' : 'no-ptr'}`}
          >
            Start
          </Button>
        </div>
          <div
        className='flex-1 gap-x-[15px] mobile:hidden desktop:flex tablet:flex'
        >
           <Button
            type="submit"
            width={'100%'}
            height={'42px'}
            borderRadius={'8px'}
            onClick={onBackButtonClicked}
            alignSelf={'center'}
            bg={'var(--app-btn-close)'}
          >
            Back
          </Button>
          <Button
            type="submit"
            width={'100%'}
            height={'42px'}
            borderRadius={'8px'}
            alignSelf={'center'}
            bg={'var(--app-btn-bg)'}
            className={`${!isFormValid ? '' : 'no-ptr'}`}
          >
            Start
          </Button>
        </div>
        </div>
      </form>
    </>
  )
}

export default React.memo(CargoInputComponent)
