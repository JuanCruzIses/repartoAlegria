'use client'
import React, { useState, useContext, useEffect }  from 'react';
import { GlobalContext } from "@/src/context"
import {useRouter} from "next/navigation";
import '@/public/css/style.css'
import {BsBasketFill} from 'react-icons/bs'
import {MdDoneOutline} from 'react-icons/md'
import '@/public/css/style.css'

export default function ProductCard({product}){
    const router = useRouter()
    const {cart, setCart} = useContext(GlobalContext)
    const [addToCart, setAddToCart] = useState(false)
    const [productInCart, setProductInCart] = useState(null)
    const [initialCart, setInitialCart] = useState({
        productId: product._id,
        cantidad: product.quantity1, 
        precio:product.price1
    })
    const handleMoreInfoClick = () => {
        localStorage.setItem("productId", product._id);
        router.push(`/productos/${product.category}/${product._id}`);
    };
    const handleAddToCart = () => {
        if(!addToCart){
            setAddToCart(true)
            setCart([
                ...cart,
                initialCart
            ]);
        }
    };
    const changeProductCart = (e)=>{
        let updatedCart = cart.filter((product)=>product.productId !== e.productId)
        setCart(updatedCart)
        setAddToCart(false)
    }
    useEffect(()=>{
        let productX = cart.find((element)=> element.productId == product._id)
        productX != undefined && setAddToCart(true)
        setProductInCart(productX)
    },[])

    return(
        <div key={product._id} className='text-center grid grid-rows-[150px,45px,40px,30px,30px,30px] gap-1 h-auto mb-2'>
            <img src={product.img} className='h-full object-cover w-full' alt={product.name} ></img>
            <h3 className='max-h-[50px] font-bold items-start pt-[2%] flex justify-center'>{product.name}</h3>
            <p className='text-black adjustText flex items-start justify-center text-sm'>{product.detail}</p>
            <button 
            className='h-full flex items-center justify-center w-45% bg-black text-white text-sm cursor-pointer min-h-[32px] py-1 px-2 md:px-[2%] md:py-[0%] text-grey-900 rounded md:p-0'
            onClick={handleMoreInfoClick}
            >Más información</button>
                <select
                className='p-0 h-full bg-[#5bb959] text-white text-center rounded-md flex'
                onChange={(event)=>{
                    changeProductCart(JSON.parse(event.target.value))
                    setInitialCart(JSON.parse(event.target.value))
                }}
                >
                    {(productInCart != undefined) && <option selected>{productInCart.cantidad} - ${productInCart.precio}</option>}
                    {((productInCart?.cantidad != product.quantity1) && (product.quantity1 && product.price1)) && <option value={JSON.stringify({productId: product._id, cantidad: product.quantity1, precio:product.price1})}>{product.quantity1} - ${product.price1}</option> }
                    {((productInCart?.cantidad != product.quantity2) && (product.quantity2 && product.price2)) && <option value={JSON.stringify({productId: product._id, cantidad: product.quantity2, precio:product.price2})}>{product.quantity2} - ${product.price2}</option> }
                    {((productInCart?.cantidad != product.quantity3) && (product.quantity3 && product.price3)) && <option value={JSON.stringify({productId: product._id, cantidad: product.quantity3, precio:product.price3})}>{product.quantity3} - ${product.price3}</option> }
                    {((productInCart?.cantidad != product.quantity4) && (product.quantity4 && product.price4)) && <option value={JSON.stringify({productId: product._id, cantidad: product.quantity4, precio:product.price4})}>{product.quantity4} - ${product.price4}</option> }
                    {((productInCart?.cantidad != product.quantity5) && (product.quantity5 && product.price5)) && <option value={JSON.stringify({productId: product._id, cantidad: product.quantity5, precio:product.price5})}>{product.quantity5} - ${product.price5}</option> }
                </select>
            <button 
            className={`cart-button h-full flex items-center justify-evenly w-45% text-green-600 text-sm cursor-pointer min-h-[32px] py-1 px-[1%] md:py-[0%] rounded md:p-0 border-1 border-green-600 font-300 ${addToCart && 'bg-green-500 text-white'}`}
            onClick={handleAddToCart}
            >
                {addToCart ? <span className='w-full flex items-center justify-center'>Agregado a la canasta<MdDoneOutline className='ml-[3%]'/></span> : <span className='w-full flex items-center justify-center'>Agregar a la canasta<BsBasketFill className='ml-[3%]'/></span>}
            </button>
        </div>  
)
}