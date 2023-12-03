'use client'
import ProductCard from "@/src/components/CommonModal/ProductCard";
import { GlobalContext } from "@/src/context"
import Link from "next/link";
import { useContext, useState, useEffect } from "react"
import {IoIosArrowBack} from 'react-icons/io'
import {GiFruitBowl} from 'react-icons/gi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomToast from "@/src/components/Cart/ToastCart"


export default function Frutasyverduras(){
const {products, cart} = useContext(GlobalContext)
const [isLoading, setIsLoading] = useState(true);
const [lengthCart, setLengthCart] = useState(cart.length)

const toastifyMessage = (productAddedInCard) =>{
    toast.success(
    <CustomToast image={productAddedInCard.img} message="Agregado al carrito!" />, 
    {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
}

useEffect(() => {
    if (products?.length > 0) {
    setIsLoading(false);
    }
}, [products]);

useEffect(()=>{
    setLengthCart(cart.length)
    if(cart.length > lengthCart){
        let productAddedInCard = products.find(product=>product._id == cart[cart.length-1].productId)
        toastifyMessage(productAddedInCard)
    }
  },[cart])

return(
    <div className="bg-white relative h-full">
        <ToastContainer/>
        <p className="flex items-center justify-center text-2xl font-medium text-center font-serif bg-black text-white h-[5vh] lg:h-[7vh]"><GiFruitBowl className="px-1 text-[30px] mx-[1%]"/>Frutas<GiFruitBowl className="px-1 text-[30px] mx-[1%]"/></p>                
        <Link href={"/productos"}>
        <div className="relative flex border-b-[1px] h-[5vh]">
            <button className="p-[5px]"><IoIosArrowBack/></button>
            <p className="text-[18px] flex items-center">Categorias</p>
        </div>
        </Link>
        <div className="pb-[10%] md:pb-0 md:w-[95%]  pl-[0.5%]md:mx-auto grid grid-cols-2 mx-[1%] gap-[1%] md:gap-y-[5%] md:grid-cols-3 lg:grid-cols-4 lg:py-[3%]">
        {isLoading ? (
            <div className="my-[3%]">
                <div className="w-full animate-pulse bg-gray-200 rounded-md h-32"></div>
                <div className="w-full animate-pulse bg-gray-200 rounded-md h-32"></div>
                <div className="w-full animate-pulse bg-gray-200 rounded-md h-32"></div>
                <div className="w-full animate-pulse bg-gray-200 rounded-md h-32"></div>
            </div>
        ) : (
        products.map((product) =>
            product.category == 'frutas' && 
                    <ProductCard key={product._id} product={product}/>
                )
        )}
        </div>
    </div>
)
}