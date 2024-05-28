'use client'
import { useRouter } from 'next/navigation'
import { ArrowBackIcon } from './Icons'

const GoBackBtn = ({ title, path }: { title: string; path: string }) => {
  const router = useRouter()

  const handleNavigation = () => {
    router.push(path)
  }

  return (
    <div className="flex gap-x-[10px] items-center" >
      <ArrowBackIcon cursor={'pointer'} boxSize={'24px'} onClick={handleNavigation}/>
      <span className="text-[24px] font-medium">{title}</span>
    </div>
  )
}

export default GoBackBtn
