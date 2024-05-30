'use server'

import GoBackBtn from '~/app/components/BackBtn'
import TransactionList from './TransactionsList'
import SearchQuery from '~/app/components/SearchQuery'
import { PrismaClient } from '@prisma/client';
import { type POResponseType } from '~/pages/api/api-typings';
import TableView from './TableViw';

const prisma = new PrismaClient();


const ReportPage = async () => { 
  //  await useCheckCargoLiveFromServer()


  

      const getPoCounts = await prisma.poCounts.findMany({
}) as unknown as POResponseType[];
    

  return (
    <>
      <div className="grid w-full grid-rows-[max-content,minmax(0,1fr)] gap-y-[10px]">
        <div className="flex  mobile:flex-col tablet:flex-row  tablet:justify-between desktop:flex-row desktop:justify-between">
          <GoBackBtn title='Reports' path='create-po'/>
          <div className="desktop:w-[400px] cursor-pointer flex items-center">
            <SearchQuery/>
          </div>
        </div>

          <div
          className='grid overflow: hidden;
    height: 100%;'
         >


          <div className='mobile:block desktop:hidden tablet:hidden overflow-auto grid overflow-y-auto overflow-x-hidden h-[calc(100dvh-90px)] w-full px-2'>
             <TransactionList  responseData={getPoCounts}/>
          </div>
          
          <div className='mobile:hidden desktop:block tablet:block'>
              <TableView responseData={getPoCounts}/>
          </div>

          </div>
      </div>
    </>
  )
}

export default ReportPage
