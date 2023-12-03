import { useContext, useState} from "react"
import { GlobalContext } from "@/src/context"
import { deleteProduct } from "@/src/services/admin"
import Loader from "../Loader"

export default function DeleteProductModal({product}){
    const {cardDelete, setCardDelete, setReloadProducts} = useContext(GlobalContext)
    const [componentLoader, setComponentLoader] = useState(false)
    const [msgProcessRequest, setMsgProcessRequest] = useState(['', null])

    
    async function handleDeleteProduct(){
        setComponentLoader(true)
        try{
            const data = await deleteProduct({_id: cardDelete.cardId})

            if (data) {
                setComponentLoader(false)
                setMsgProcessRequest([data.message, data.success])
                setReloadProducts(true)
            }else{
                setReloadProducts(false)
                setComponentLoader(false)
                setMsgProcessRequest([data.message, false])
            }
        }catch(error){
            setMsgProcessRequest(['Error en la eliminación del producto', false])

        }   
    }

    return(
        <div className={`${cardDelete.active == true && (cardDelete.cardId == product._id) ? 'flex' : 'hidden'} max-h-[245px] transition-transform duration-300 absolute h-full w-full z-15 bg-white flex-row p-2 flex-wrap shadow-lg`}>
            {msgProcessRequest[0] != '' ?
                <p className={`text-center font-bold mb-[7%] m-auto ${msgProcessRequest[1] == true ? 'text-green-600' : 'text-red-600'}`}>{msgProcessRequest}</p>
                :
                <p className="flex items-center font-bold m-auto">¿Estás seguro que deseas borrar este producto?</p>
            }
            <div className="flex items-center w-full justify-center">
                <p className="w-[70%] text-center">{cardDelete.cardId == product._id && product.name}</p>
                <img className="h-[50px] w-[50px] rounded-[50%] object-cover md:h-[100px] md:w-[100px]" src={cardDelete.cardId == product._id && product.img}/>
            </div>
            {!componentLoader ?
                <div className="flex w-full m-auto justify-around">
                    <span 
                    className="w-[35%] flex items-center justify-center w-45% bg-red-800 text-white border-[1px,solid,black] text-sm cursor-pointer min-h-[32px] py-1 px-2 md:px-[2%] md:py-[0%] text-grey-900 rounded md:p-0"
                    onClick={handleDeleteProduct}
                    >Confirmar</span>
                    <span 
                    className='w-[35%] flex items-center justify-center w-45% bg-black text-white text-sm cursor-pointer min-h-[32px] py-1 px-2 md:px-[2%] md:py-[0%] text-grey-900 rounded md:p-0'
                    onClick={()=>setCardDelete({active:false, cardId:undefined})}
                    >Cancelar</span>
                </div>
                :
                <Loader/>
            }
        </div>
    )
}