import { useContext, useEffect, useState} from "react"
import { GlobalContext } from "@/src/context"
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs"

export default function ButtonsAdminProduct({product}){
    const {cardEdit, setCardEdit, cardDelete, setCardDelete, setProductToEdit, productToEdit} = useContext(GlobalContext)
    console.log(cardEdit.cardId)
    return(
        <>
        <div className={`${((cardEdit.active == true || cardDelete.active == true) && (cardEdit.cardId == product._id || cardDelete.cardId == product._id)) &&  'hidden'} absolute top-[1%] w-[100%] flex justify-around z-10`}>
            <span
                className="text-[14px] flex items-center justify-center w-[45%] md:h-[40px] bg-black text-white cursor-pointer py-1 px-[1px] rounded-md"
                onClick={()=>{
                    setProductToEdit(null)
                    setCardEdit({active:false, cardId:undefined})
                    setProductToEdit(product)
                    setCardEdit({active:true, cardId:product._id})
                }}
            ><BsFillPencilFill className="mr-[3%]"/>Editar
            </span>
            <span
                className="text-[14px] flex items-center justify-center w-[45%] md:h-[40px] bg-red-800 text-white cursor-pointer py-1 px-[1px] rounded-md"
                onClick={()=>
                    setCardDelete({active:true, cardId:product._id})
                }
            ><BsFillTrashFill className="mr-[3%]"/>Eliminar
            </span>
        </div>
        </>
    )
}