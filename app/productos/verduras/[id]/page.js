'use client'
import { GlobalContext } from "@/src/context"
import Link from "next/link";
import { useContext, useState, useEffect } from "react"
import {IoIosArrowBack} from 'react-icons/io'

export default function ProductDetail(){
const {products} = useContext(GlobalContext)
const [isLoading, setIsLoading] = useState(true);
const [product, setProduct] = useState(null)

useEffect(() =>{
    const localProductId = localStorage.getItem("productId");

    if (!localProductId) {
      setIsLoading(false);
      return;
    }

    if (products && products.length) {
        const foundProduct = products.find((p) => p._id === localProductId);
  
        if (foundProduct) {
          setProduct(foundProduct);
        }
    }

    setIsLoading(false);    
},[products])



return(
        <div className="bg-white relative h-full pb-200px">
            {/* <p className="text-2xl font-medium text-center font-serif bg-black text-white">Verduras</p>                 */}
            <Link href='/productos/frutas'>
            <div className="relative flex border-b-[1px] md:h-[7%] font-[18px]">
                <button className="p-[5px]"><IoIosArrowBack/></button>
                <p className="flex items-center text-[18px]">Verduras</p>
            </div>
            </Link>
            <div className="px-[2%]">
            {isLoading || !product  ? (
                <>
                <div className="my-5 h-[50vh] w-full animate-pulse bg-gray-200 rounded-md"></div>
                </>
            ) : (
                <div>
                    <h2 className="p-2 font-bold">{product.name}</h2>
                    <img className="w-full h-[35vh]" src={product.img}></img>
                    <p className="p-2 text-[15px]">{product.detail}</p>
                    <div className="grid grid-cols-2 mt-[5%] px-[5%] pb-[10vh]">
                        <div className="grid-rows-6 grid-rows-[35px 35px 35px 35px 35px 35px]  text-center grid border border-solid border-black rounded-t">
                            <h5 className="border border-solid border-black p-1 text-[15px] font-bold bg-black text-white rounded-t">Cantidad</h5>
                            <p className="border border-solid border-black p-1 text-[15px]">{product.quantity1.length ? product.quantity1 : '-'}</p>
                            <p className="border border-solid border-black p-1 text-[15px]">{product.quantity2.length ? product.quantity2 : '-'}</p>
                            <p className="border border-solid border-black p-1 text-[15px]">{product.quantity3.length ? product.quantity3 : '-'}</p>
                            <p className="border border-solid border-black p-1 text-[15px]">{product.quantity4.length ? product.quantity4 : '-'}</p>
                            <p className="border border-solid border-black p-1 text-[15px]">{product.quantity5.length ? product.quantity5 : '-'}</p>
                        </div>
                        <div className="grid-rows-6 grid-rows-[35px 35px 35px 35px 35px 35px] text-center grid border border-solid border-black rounded-t">
                            <h5 className="border border-l-0 border-solid border-black p-1 text-[15px] font-bold bg-black text-white rounded-t">Precios</h5>
                            <p className="border border-l-0 border-solid border-black p-1 text-[15px]">${product.price1 != null && product.price1}</p>
                            <p className="border border-l-0 border-solid border-black p-1 text-[15px]">${product.price2 != null && product.price2}</p>
                            <p className="border border-l-0 border-solid border-black p-1 text-[15px]">${product.price3 != null && product.price3}</p>
                            <p className="border border-l-0 border-solid border-black p-1 text-[15px]">${product.price4 != null && product.price4}</p>
                            <p className="border border-l-0 border-solid border-black p-1 text-[15px]">${product.price5 != null && product.price5}</p>
                        </div>
                        <div></div>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}

