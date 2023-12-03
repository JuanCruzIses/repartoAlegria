'use client'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { GlobalContext } from "@/src/context"
import { useContext, useEffect, useState } from "react"
import { FloatingLabel, Form } from "react-bootstrap";
import Loader from '../Loader';
import '@/public/css/style.css'


let initialDataCart = 	{
  price: '',
  name: '',
  phone: '',
  location: '',
  list: '',
}

export default function FormBuyCart(){
  const {cart, user, totalPrice} = useContext(GlobalContext)
  const [preferenceId, setPreferenceId] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null)
  const [divMp, setDivMp] = useState(false)
  const [formData, setFormData] = useState(initialDataCart)

  const initializeMercadoPago = () => {
    initMercadoPago('TEST-d63fbfcb-5b64-4038-aa0e-ab4459a8f620');
  }

  function isFormValid(){
    return formData?.name && formData.name.length >= 3 &&
    formData?.phone && formData.phone.length >= 8 && Number(formData.phone) &&
    formData?.location && formData.location.length >= 5 ? true : false
  }
  
  useEffect(()=>{
    totalPrice != 0 && setFormData({...formData, price:totalPrice, list:cart})
  },[totalPrice])

    const handleBuy = async(e)=>{
    initializeMercadoPago()
    e.preventDefault()
    setIsLoading(true)
    await fetch("http://localhost:8080/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      .then((response) => {
        return response.json();
      })
      .then((preference) => {
        setPreferenceId(preference.id);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error);
      })
    }

    return(
      <Form 
      className={`py-[10px] px-[5px] text-center lg:w-[70%] mt-[5%] mx-auto`}
      >
        <div>
            <h4 className="w-[95%] text-left mx-auto font-bold mb-[15px]">Finaliza tu compra</h4>
            <FloatingLabel
            controlId="floatingInput"
            label="Nombre y apellido"
            className="mb-3 w-[95%] m-auto labelContact"
            >
                <Form.Control 
                type="text"
                placeholder="Nombre"
                className="px-2 py-2"
                onChange={(event)=>{
                  setFormData({...formData, name : event.target.value})
                }} 
                />
            </FloatingLabel>

            <FloatingLabel
            controlId="floatingInput"
            label="Teléfono"
            className="mb-3 w-[95%] m-auto labelContact"
            >
                <Form.Control
                type="number"
                placeholder="Teléfono"
                className="px-2 py-2"
                onChange={(event)=>{
                  setFormData({...formData, phone : event.target.value})
                }} 
                />
            </FloatingLabel>

            <FloatingLabel
            controlId="floatingInput"
            label="Dirección"
            className="mb-3 w-[95%] m-auto labelContact"
            >
                <Form.Control 
                type="text"
                placeholder="Dirección"
                className="px-2 py-2"
                onChange={(event)=>{
                  setFormData({...formData, location : event.target.value})
                }} 
                />
            </FloatingLabel>
          </div>
          {isLoading && <Loader/>}
          <div className='flex items-center justify-center'>
          {!(preferenceId != null || isLoading) &&
            <button
            disabled={!isFormValid()}
            className='disabled:opacity-50 w-[45%] bg-green-600 text-white rounded-[5px] md:w-[25%] mt-[3%] mb-[5%]'
            onClick={(e)=>{
              !isFormValid && setMessage("Por favor, completa todos los campos")  
              handleBuy(e)
              setDivMp(true)
            }}>
                Pagar
            </button>
            }
            <div id="wallet_container" className={`mpButton ${divMp ? 'block' : 'hidden'}`}>
              {preferenceId && <Wallet initialization={{ preferenceId }} />}
            </div>
        </div>
      </Form>
    )
}