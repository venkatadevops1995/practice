import {
  CloseButton,
  IconButton,
  Menu,
  MenuButton,
  Image,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import CustomDrawer from '~/app/components/Drawer'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
export default function MenuBar() {
  const drawerRef = useRef<any>(null)
  const router = useRouter()

  const onOpenDrawer = () => {
    drawerRef?.current?.onOpen()
  }

  const onCloseDrawer = () => {
    drawerRef?.current?.onClose()
  }

  const onNavigate = (path: string) => {
    router.push(path, { scroll: true })
  }

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon  fontSize={'clamp(25px,1vw,50px)'}/>}
          variant="none"
          onClick={onOpenDrawer}
        />
      </Menu>
      <CustomDrawer ref={drawerRef}>
        <div className="h-full w-full bg-[var(--app-drawer-bg)] gap-y-[20px] flex flex-col">
          <div className="flex justify-between m-auto w-[80%] pr-2 pt-4">
            <div className="flex gap-x-1">
              <Image src="/images/atai_logo.svg" alt="logo" />
              <Image src="/images/atai_name.svg" alt="logo" />
            </div>

            <CloseButton alignSelf={'right'} onClick={onCloseDrawer} />
          </div>
          <div className="pl-2 pt-4 m-auto w-[80%] h-full">
            <div
              className="flex gap-x-[10px] cursor-pointer"
              onClick={() => onNavigate('reports')}
            >
              <Image sizes="md" src="/images/report_icon.svg" alt="report" />
              <span>Reports</span>
            </div>
          </div>
        </div>
      </CustomDrawer>
    </>
  )
}
