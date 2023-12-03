import { GlobalContext } from "@/src/context"
import { useContext } from "react"

export default function ButtonEdit(){
    const {editCard, setEditCard} = useContext(GlobalContext)

    return(
        <div className="my-[2%] flex justify-start pl-[3%]">
            <div className={`w-[50%] flex`}>
                <button 
                onClick={()=>setEditCard(!editCard)}
                className={`${editCard ? 'bg-green-500' : 'bg-black'} w-[45%] md:w-[25%] text-white rounded-[5px]`}
                >{editCard ?  "Confirmar" : 'Editar'}
                </button>
            </div>
        </div>
    )
}