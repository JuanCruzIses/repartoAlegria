import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { GlobalContext } from "@/src/context"
import { useContext, useState, useEffect } from "react"
import {useRouter} from "next/navigation";


export default function CartEmptyModal(){
    const router = useRouter()
    const {cart} = useContext(GlobalContext)
    
    return(
        <TableContainer component={Paper} className={`${!cart.length && 'h-full flex items-center justify-center text-center'}`}>
        <div className='h-[60%] flex flex-col justify-evenly'>
          <p>Aún no hay productos en tu canasta</p>
          <button 
          onClick={()=> router.push('/')}
          className='bg-black w-[40%] mx-auto text-white rounded-[3px] px-[1px]'>Ir a comprar</button>
        </div>
      </TableContainer>
    )
}