'use client'
import { useRouter } from 'next/navigation'
import { ArrowBackIcon } from './Icons'
import React, { useCallback } from 'react';

const GoBackBtn = ({ title, path }: { title: string; path: string }) => {
  const router = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleNavigation = () => {
    router.push(path)
  }

  const callBack = useCallback(()=> {
    handleNavigation();
  }, [handleNavigation])


  return (
    <div  onClick={callBack} className="flex gap-x-[10px] items-center" >
      <ArrowBackIcon cursor={'pointer'} boxSize={'24px'} />
      <span className="text-[24px] font-medium">{title}</span>
    </div>
  )
}

export default React.memo(GoBackBtn)
