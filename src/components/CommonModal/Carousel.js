import { GlobalContext } from "@/src/context"
import Carousel from 'react-bootstrap/Carousel';
import React, { useContext, useEffect, useState } from 'react';
import Loader from "../Loader";
import '@/public/css/style.css'

export default function CarouselImages() {
  const {products} = useContext(GlobalContext)
  
  if (!products?.length) {
    return (
      <div className="px-2 text-center">
        <p>Cosechando nuestros productos, por favor aguarde...</p>
        <Loader/>
      </div>
    )
  }
  return(
        <>
        <Carousel className="w-full md:h-[100%] md:w-[65%] carouselPadre" fade>
          {products.length && products.map((product, i) =>
              i < 4 && 
              <Carousel.Item className="h-[100%]" key={i}>
                <img
                  className="d-block w-100 h-full"
                  src={product.img}
                  alt="a"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
          )}
        </Carousel>
        </>
    )
}