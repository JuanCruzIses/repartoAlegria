'use client'

import { loginFormControls } from "@/src/utils"
import InputComponent from "@/src/components/FormElements/InputComponent"
import { useRouter } from "next/navigation"
import { login } from "@/src/services/login"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/src/context"
import Cookies from "js-cookie"
import Loader from "@/src/components/Loader"
import "@/public/css/style.css"

const initialFormData = {
    email: '',
    password: ''
}

export default function Login(){
    const [formData, setFormData] = useState(initialFormData)
    const router = useRouter()
    const {isAuthUser, setIsAuthUser, user, setUser, componentLoader, setComponentLoader } = useContext(GlobalContext)
    function isValidForm(){
        return formData?.email && formData.email.trim() !== '' &&
        formData?.password && formData.password.trim() !== '' ? true : false
    }

    async function handleLogin(){
        setComponentLoader({loading : true, id: ''})
        const res = await login(formData)

        if(res.succes){        
            setIsAuthUser(true)
            setUser(res?.finalData?.user)
            setFormData(initialFormData)
            Cookies.set("token", res?.finalData?.token)
            localStorage.setItem("user", JSON.stringify(res?.finalData?.user))
            setComponentLoader({loading : false, id: ''})
            router.push('/')
        }else{
            setComponentLoader({loading : false, id: ''})
            setIsAuthUser(false)
        }
    }
    
    useEffect(()=>{
        isAuthUser && router.push('/')
    },[isAuthUser])
    

    return(
        <div className="bg-white relative h-[90vh] w-full md:h-auto containerLogin">
        <div className="min-w-[90%] flex flex-col items-center justify-bettwen pt-0n pb-0 mr-auto xl:px-5 lg:flex-row h-full">
            <div className="flex flex-col justify-center items-center w-full lg:flex-row h-full">
                <div className="w-full mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-8/12 h-full">
                    <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10 h-full text-center">
                        <p className="w-full text-3xl font-medium text-center font-serif m-[10%]">Iniciar sesión</p>                
                                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                    {
                                        loginFormControls.map((controlItem) =>
                                            controlItem.componentType === "input" ? (
                                                <InputComponent
                                                key={controlItem.id} 
                                                type={controlItem.type}
                                                placeholder={controlItem.placeholder}
                                                label={controlItem.label}
                                                value={formData[controlItem.id]}
                                                onChange={(event)=>{
                                                    setFormData({
                                                        ...formData,
                                                        [controlItem.id] : event.target.value
                                                    })
                                                }}
                                                />
                                            ) 
                                            :
                                            null
                                        )
                                    }
                                    <div className="mt-[15px] h-[150px] flex justify-center flex-column lg:flex-row lg:justify-around">
                                        {
                                            componentLoader?.loading ? 
                                            <Loader/>
                                            :
                                            <>
                                                <button 
                                                className="m-auto text-sm w-[60%] disabled:opacity-50 inline-flex items-center justify-center bg-black px-2 py-2 text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-md lg:w-[45%]"
                                                disabled={!isValidForm()}
                                                onClick={handleLogin}
                                                >Iniciar sesión
                                                </button>
                                                <button 
                                                    className="bg-[#5bb959] inline-flex text-sm w-[60%] items-center justify-center  px-2 py-2  text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide m-auto rounded-md lg:w-[45%]"
                                                    onClick={()=>router.push("/register")}>
                                                    Registrarse
                                                </button>
                                            </>
                                        }
                                    </div>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}