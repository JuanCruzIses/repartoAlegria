import { BsBasket } from "react-icons/bs";
import '@/public/css/style.css'
import { GlobalContext } from "@/src/context";
import { useContext } from "react";
import {useRouter} from "next/navigation";


export default function AbsoluteCartButton(){
    const {cart} = useContext(GlobalContext)
    const router = useRouter()

    return(
        <button 
        className="flex items-center relative h-[50%] m-auto rounded-[5px] justify-center w-[36px] md:hidden"
        onClick={()=>router.push('/canasta')}
        >
            <BsBasket/>
            <span
            className="text-white hover:cursor-pointer absolute flex items-center justify-center top-[2px] right-[2px] bg-red-600 rounded-[50%] w-[11px] h-[11px] text-[10px]">
                {cart.length}
            </span>
        </button>
    )
}