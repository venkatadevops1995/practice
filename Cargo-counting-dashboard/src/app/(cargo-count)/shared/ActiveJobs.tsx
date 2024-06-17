"use client";

import { type POResponseType } from "~/pages/api/api-typings";
import TransactionList from "./TransactionsList";
import { useEffect, useState } from "react";



const ActiveJobsList  =    ({data}: {data:POResponseType[]})=> {
       

    const [getData,setData] = useState<POResponseType[]>([]);


    useEffect(()=> {
        
        if(data) {
             setData(data)
        }
    
    }, [data])


    

    return  <>
        
        <div className="w-full h-full ">
            <div className='mobile:block desktop:hidden tablet:hidden overflow-auto grid overflow-y-auto overflow-x-hidden h-[calc(100dvh-90px)] w-full px-2'>
             <TransactionList isActiveJobs={true}  responseData={getData}/>
          </div>
          
            <div className='mobile:hidden desktop:block tablet:block h-[calc(100dvh-90px)] grid overflow-y-auto'>
            <TransactionList isActiveJobs={true} responseData={getData} />

          </div>
        </div>


    </>

}


export default ActiveJobsList