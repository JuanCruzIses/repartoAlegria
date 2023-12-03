'use client'
import { useState } from "react"
import { FloatingLabel, Form } from "react-bootstrap";
import '@/public/css/style.css'
import Loader from "@/src/components/Loader";

const initialFormData = {
    name: '',
    email: '',
    phone: '',
    message: '',
};
  

export default function Contact() {
const [isLoading, setIsLoading] = useState(false);
const [message, setMessage] = useState(null);
const [formData, setFormData] = useState(initialFormData)
const [campos, setCampos] = useState({name:false, email:false, phone:false, message:false})

async function handleSend(event){
    setIsLoading(true)
    event.preventDefault()
    try{
        const res = await fetch(process.env.URL_MAILER, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        if(res.status == 200){  
            setIsLoading(false)
            setMessage('El mensaje se envío correctamente!')
        }else{
            setIsLoading(false)
            setMessage('No se pudo enviar el mensaje, por favor vuelva a intentarlo')
        }
    }catch(error){
        setIsLoading(false)
        console.error('Error al enviar el mensaje', error)
    }
}

  return (
    <div className="bg-white relative h-full">
        <div>
            <p className="text-2xl font-medium text-center font-serif mt-[10%] mb-[7%] md:my-[4%] lg:text-3xl">Contacto</p>                
            <p className="w-[90%] mx-auto text-[14px] mb-[7%] text-center md:mb-[4%] lg:text-[17px]">Dejanos tu mensaje y nos comunicaremos a la brevedad</p>
            <Form 
            className="text-center lg:w-[70%] m-auto"
            >
                <FloatingLabel
                controlId="floatingInput"
                label="Nombre y apellido"
                className="mb-3 w-[85%] m-auto labelContact"
                >
                    <Form.Control 
                    isInvalid={campos.nombre == true && !formData.name}
                    value={formData.name}
                    type="text"
                    placeholder="Nombre"
                    className="px-2 py-2"
                    onChange={(event)=>{
                        setCampos({...campos, nombre:true})
                        setFormData({
                            ...formData,
                            name : event.target.value
                        })
                    }}
                    />
                </FloatingLabel>

                <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-3 w-[85%] m-auto labelContact"
                >
                    <Form.Control
                    isInvalid={campos.email == true && !formData.email}
                    value={formData.email}
                    type="email" 
                    placeholder="Email"
                    className="px-2 py-2"
                    onChange={(event)=>{
                        setCampos({...campos, email:true})
                        setFormData({
                            ...formData,
                            email : event.target.value
                        })
                    }}
                    />
                </FloatingLabel>

                <FloatingLabel
                controlId="floatingInput"
                label="Celular"
                className="mb-3 w-[85%] m-auto labelContact"
                >
                    <Form.Control
                     
                    isInvalid={campos.phone == true && !formData.phone}
                    type="tel" 
                    placeholder="Celular"
                    className="px-2 py-2"
                    value={formData.phone}
                    onChange={(event)=>{
                        setCampos({...campos, phone:true})
                        setFormData({
                            ...formData,
                            phone : event.target.value
                        })
                    }}
                    />
                </FloatingLabel>

                <FloatingLabel 
                controlId="floatingTextarea2" 
                label="Mensaje"
                className="labelContact2 w-[85%] m-auto py-2">
                    <Form.Control
                    isInvalid={campos.message == true && !formData.message}
                    value={formData.message}
                    as="textarea"
                    placeholder="Mensaje"
                    style={{ height: '100px', maxHeight: '170px' }}
                    onChange={(event)=>{
                        setCampos({...campos, message:true})
                        setFormData({
                            ...formData,
                            message : event.target.value
                        })
                    }}
                    />
                </FloatingLabel>
                <div className="mt-[5px] h-[150px] flex justify-center flex-column lg:flex-row lg:justify-around w-[75%] m-auto md:w-[60%]">
                    {
                        isLoading ? 
                        <Loader/>
                        :
                        message != null ?
                        <p>{message}</p>
                        :
                        <>
                        <button 
                        className="mx-auto mt-0 text-sm w-[60%] disabled:opacity-50 inline-flex items-center justify-center bg-black px-2 py-2 text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-md lg:w-[45%]"
                        onClick={handleSend}
                        disabled={!formData.name || !formData.email || !formData.phone || !formData.message}
                        >Enviar
                        </button>
                        </>
                    }
                </div>

            </Form>
        </div>
    </div>

  )
}
