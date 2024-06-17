'use server'

import GoBackBtn from '~/app/components/BackBtn'
import SearchQuery from '~/app/components/SearchQuery'
import { PrismaClient } from '@prisma/client';
import { type POResponseType } from '~/pages/api/api-typings';
import TransactionList from '../shared/TransactionsList';
import TableView from '../shared/TableViw';

const prisma = new PrismaClient();

const ReportPage = async () => { 
  //  await useCheckCargoLiveFromServer()
      const getPoCounts = await prisma.cargoCount.findMany({
        orderBy: {
           startAt: 'desc'
        }
}) as unknown as POResponseType[];
    

  return (
    <>
      <div className="grid w-full grid-rows-[max-content,minmax(0,1fr)] gap-y-[10px]">
        <div className="flex  mobile:flex-col gap-y-[20px] tablet:flex-row  tablet:justify-between desktop:flex-row desktop:justify-between">
          <GoBackBtn title={'Reports'} path={"/create-po"}/>
          <div className="desktop:w-[400px] cursor-pointer flex items-center">
            <SearchQuery/>
          </div>
        </div>

          <div
          className='grid overflow:hidden'
         >


          <div className='mobile:block desktop:hidden tablet:hidden overflow-auto grid overflow-y-auto overflow-x-hidden h-[calc(100dvh-109px)] w-full px-2'>
             <TransactionList  responseData={getPoCounts}/>
          </div>
          
          <div className='mobile:hidden desktop:block tablet:block h-[calc(100dvh-100px)]'>
              <TableView responseData={getPoCounts} isActivePage={false}/>
          </div>

          </div>
      </div>
    </>
  )
}

export default ReportPage
