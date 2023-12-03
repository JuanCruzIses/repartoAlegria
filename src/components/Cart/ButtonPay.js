import { GlobalContext } from "@/src/context"
import { useContext } from "react"

export default function ButtonPay(){
    const {goPay, setGoPay} = useContext(GlobalContext)
    const payCart = ()=>{
        setGoPay(true)
    }

    return(
        <div className="my-[2%] flex justify-start pl-[3%]">
            <div className={`${(goPay) ? "justify-start" : 'justify-around'} w-[50%] flex`}>
                <button 
                onClick={payCart}
                className={`${(editCard || goPay) && 'hidden'} w-[45%] bg-green-600 text-white rounded-[5px]`}
                >
                    Finalizar compra
                </button>
            </div>
        </div>
    )
}