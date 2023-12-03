'use client'

import InputComponent from "@/src/components/FormElements/InputComponent"
import { registerNewUser } from "@/src/services/register"
import { registrationFormControls } from "@/src/utils"
import { useContext, useState } from "react"
import { GlobalContext } from "@/src/context"
import { useRouter } from "next/navigation"

const initialFormData = {
    name: '',
    email: '',
    password: '',
    role: 'customer',
}

export default function Register() {
    const {componentLoader, setComponentLoader } = useContext(GlobalContext)
    const [formData, setFormData] = useState(initialFormData)
    const [messageProcess, setMessageProcess] = useState([false, null])
    const router = useRouter()

    function isFormValid(){
        return formData?.name && formData.name.length > 2 &&
        formData?.email && formData.email.length > 3 &&
        formData?.password && formData.password.length > 3 ? true : false
    }

    async function handleRegisterOnSubmit(){
        setComponentLoader({loading : true, id: ''})
        const data = await registerNewUser(formData)

        if(data.succes){
            setComponentLoader({loading : false, id: ''})
            setMessageProcess([true, data.message])
        }else{
            setComponentLoader({loading : false, id: ''})
            setMessageProcess([false, data.message])
        }
    }

    return (
        <div className="bg-white relative h-[100%] w-full">
            <div className="min-w-[90%] flex flex-col items-center justify-bettwen pt-0n pb-0 mr-auto xl:px-5 lg:flex-row h-full">
                <div className="flex flex-col justify-center items-center w-full lg:flex-row h-full">
                    <div className="w-full mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-8/12 h-full">
                        <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10 h-full text-center">
                            <p className="w-full text-3xl font-medium text-center font-serif m-[10%]">
                                    Registrarse
                            </p>
                            {messageProcess[1] !== null && <p className={`${messageProcess[0] == false ? 'text-red-500'  : 'text-green-500'} font-[600] flex items-center`}>{messageProcess[1]}</p>}
                                    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                        {
                                            registrationFormControls.map((controlItem) =>
                                                controlItem.componentType === "input" &&
                                                    <InputComponent 
                                                    key={controlItem.id}
                                                    type={controlItem.type}
                                                    placeholder={controlItem.placeholder}
                                                    label={controlItem.label}
                                                    onChange={(event)=>{
                                                        setMessageProcess([false, null])
                                                        setFormData({...formData, [controlItem.id] : event.target.value})
                                                    }}
                                                    value={formData[controlItem.id]}
                                                    />
                                                
                                            )
                                        }
                                        <div className="mt-[15px] h-[150px] flex justify-center flex-column lg:flex-row lg:justify-around">
                                            {messageProcess[0] !== true &&
                                            <button 
                                            className="m-auto text-sm w-[60%] disabled:opacity-50 inline-flex items-center justify-center bg-black px-2 py-2 text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-md lg:w-[45%]"
                                            disabled={!isFormValid()}
                                            onClick={handleRegisterOnSubmit}
                                            >
                                                Registrarse
                                            </button>
                                            }
                                            <button 
                                            className="bg-[#5bb959] inline-flex text-sm w-[60%] items-center justify-center  px-2 py-2  text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide m-auto rounded-md lg:w-[45%]"
                                            onClick={()=>router.push("/login")}>
                                                Iniciar sesión
                                            </button>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}