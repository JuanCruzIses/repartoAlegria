'use client'
import Form  from "@/src/components/CommonModal/Form"
import { useContext, useEffect, useState} from "react"
import { GlobalContext } from "@/src/context"
import { useRouter } from "next/navigation"
import ProductCardEdit from "@/src/components/Admin/ProductCardEdit"
import Loader from "@/src/components/Loader"


export default function Admin(){
    const {user, products, setCardDelete, setCardEdit} = useContext(GlobalContext)  
    const router = useRouter()
    const [buttonActive, setButtonActive] = useState(1)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(user?.role !== 'admin'){
            router.push('/')
        }

        if (products?.length > 0) {
            setIsLoading(false);
          }
    },[])

    return(
        <div className="bg-white relative h-full">
            <div className="min-w-[90%] flex flex-col items-center justify-bettwen pt-0n pb-0 mr-auto xl:px-5 h-full">
                <div className="flex flex-col justify-center items-center w-full h-full md:pb-[30%] lg:pb-[22%]">
                    <div className="w-[100%] flex my-[5%] justify-around md:ml-[-55%] md:w-[40%] lg:w-[30%] lg:ml-[-65%] xl:mt-[2%] xl:mb-[3%] xl:w-[20%]">
                        <button 
                        className={`${buttonActive == 1 ? 'bg-[#5bb959] ' : 'bg-black '} text-white cursor-pointer py-1 px-1 rounded-md text-[14px] p-0 h-full flex`}
                        onClick={()=>{
                            setCardDelete({active:false, cardId:undefined})
                            setCardEdit({active:false, cardId:undefined})
                            setButtonActive(1)}
                        }
                        >Agregar productos</button>
                        <button 
                        className={`${buttonActive == 2 ? 'bg-[#5bb959] ' : 'bg-black ' }text-white cursor-pointer py-1 px-1 rounded-md text-[14px] p-0 h-full flex`}
                        onClick={()=>setButtonActive(2)}
                        >Editar productos</button>
                    </div>
                    <p className="w-full text-3xl font-medium text-center font-serif mt-[5%] mb-[8%] md:mt-[2%] md:mb-[10%] lg:mt-[0%] lg:mb-[5%]">{buttonActive == 1 ? 'Agregar productos' : 'Editar productos'}</p>
                    {buttonActive == 1 ?
                    <Form/>
                    :
                    <div className="pb-[35%] md:pb-0 md:w-[95%]  pl-[0.5%]md:mx-auto grid grid-cols-1 mx-[1%] gap-[1%] md:gap-y-[5%] md:grid-cols-2 lg:grid-cols-3 lg:py-[3%]">
                        {isLoading ? (
                            <Loader/>
                        ) : (
                            products.map((product) => <ProductCardEdit key={product._id} product={product}/>)
                        )}
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}
