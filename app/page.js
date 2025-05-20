'use client'

import { GlobalContext } from "@/src/context"
import { useContext, useState, useEffect } from "react"
import Carousel  from "@/src/components/CommonModal/Carousel"
import ProductCard from "@/src/components/CommonModal/ProductCard"
import Loader from "@/src/components/Loader"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomToast from "@/src/components/Cart/ToastCart"
import SkeletonCards from "@/src/components/CommonModal/SkeletonCards"
import OptionsButtonsProducts from "@/src/components/CommonModal/OptionsButtonsProducts"
import AbsoluteCartButton from "@/src/components/CommonModal/AbsoluteCartButton"
import '@/public/css/style.css'

export default function Home() {
const {products, cart, categorySelected} = useContext(GlobalContext)
const [isLoading, setIsLoading] = useState(true);
const [lengthCart, setLengthCart] = useState(cart.length)
const toastifyMessage = (productAddedInCard) =>{
  toast.success(
  <CustomToast image={productAddedInCard.img} message="Agregado a la canasta" />, 
  {
    position: "top-right",
    autoClose: 1500,
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


  return (
    <div className="bg-white relative h-full text-black">
      <ToastContainer/>
      <p className="h-[10vh] text-center font-bold flex justify-center items-center md:hidden">De la huerta a tu hogar: alimentos con corazón</p>
      <div className={`flex h-[40vh] md:h-[50vh] ${!products?.length && 'items-center'}`}>
        {!products?.length ?
        <div className={`px-2 text-center w-full ${!products?.length && 'flex items-center flex-col h-[60%]'}`}>
          <p className="font-bold h-[50%] items-center flex">Cosechando nuestros productos, por favor aguarde...</p>
          <Loader/>
        </div>
        :
        <>
        <Carousel/>
        <div className="hidden bg-[#249A76] md:flex w-[50%]">
          <img src="/images/banner.png" className="bg-[#249A76] h-[40vh] m-auto w-full object-contain"></img>
        </div>
        </>
        }
      </div>
      <div>
        <OptionsButtonsProducts/>
        <div className="pb-[10%] md:w-[95%] md:mx-auto grid grid-cols-2 mx-[1%] mb-[2%] gap-[1%] md:gap-y-[5%] md:grid-cols-3 lg:grid-cols-4 lg:pb-[2%]">
          {isLoading ? (
              <SkeletonCards/>
              ) : (
              products.map((product) =>{
                if (categorySelected === product.category) {
                  return <ProductCard key={product._id} product={product} />;
                }else if(categorySelected === 'todos') {
                  return <ProductCard key={product._id} product={product} />;
                }
              })
            )}
        </div>
      </div>
    </div>

  )
}
