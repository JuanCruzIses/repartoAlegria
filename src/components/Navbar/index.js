'use client'

import { GlobalContext } from "@/src/context";
import { navOptions} from "@/src/utils";
import { useContext } from "react";
import {useRouter} from "next/navigation";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import {FaDoorOpen} from "react-icons/fa"
import Link from "next/link";
import '@/public/css/style.css'
import AbsoluteCartButton from "../CommonModal/AbsoluteCartButton";

function NavItems({ isModalView=false}) {
    const router = useRouter()
    const {cart, user, setUser, isAuthUser, setIsAuthUser, showNavModal, setShowNavModal} = useContext(GlobalContext)

    function handleLogout(){
        setIsAuthUser(false)
        setUser(null)
        Cookies.remove('token')
        router.push('/')
    }
   
    return (
        <div className={`col-span-3 items-center justify-between w-full text-center flex flex-col-reverse md:flex h-[95%] m-auto mt-0 md:w-[100%] md:bg-white md:pt-[25px]  ${isModalView ? "" : "hidden"} pt-[2%]`} id="nav-items">
            <div className="w-full pt-[2%] flex justify-around md:absolute md:top-[15%] md:right-[1%] md:w-[30%] md:align-center md:ml-0 lg:w-[20%] lg:pt-0">
            <div className="w-[90%] pt-[5%] flex justify-around md:absolute md:top-[50%] md:right-[1%] md:w-[100%] md:align-center md:m-0 md:p-0 lg:bottom-[-50px] lg:top-[initial]"> 
                {user?.role === 'admin' &&
                    <Link
                    onClick={()=>setShowNavModal(!showNavModal)}
                    href={{
                        pathname:"/admin"
                    }}
                    className="navButton w-45% bg-[#000000] text-white flex items-center justify-center text-[11px] lg:text-[12px] lg:text-14px cursor-pointer py-1 px-2 md:px-[2%] md:py-[0%] text-grey-900 rounded md:p-0 h-[2.5em]"
                    >
                    Admin</Link>
                }
                {isAuthUser ?
                    <button
                    onClick={()=>{
                        handleLogout()
                        setShowNavModal(!showNavModal)
                    }} 
                    className="navButton w-45% bg-[#000000] text-white flex items-center justify-center text-[11px] lg:text-[12px] lg:text-14px cursor-pointer py-1 px-2 md:px-[2%] md:py-[0%] text-grey-900 rounded md:p-0   h-[2.5em]">
                        <FaDoorOpen/>Logout
                    </button> 
                :
                    <div className="flex justify-around w-[90%] md:w-[100%]"> 
                        <Link
                        onClick={()=>setShowNavModal(!showNavModal)}
                        href={{
                            pathname:"/login"
                        }}
                        className="navButton w-45% bg-[#000000] text-white flex items-center justify-center text-[11px] lg:text-[12px] lg:text-14px cursor-pointer py-1 px-2 md:px-[2%] md:py-[0%] text-grey-900 rounded md:p-0   h-[2.5em]" 
                        >
                            Iniciar Sesion
                        </Link>
                        <button 
                        className="navButton w-45% bg-[#000000] text-white flex items-center justify-center text-[11px] lg:text-[12px] lg:text-14px cursor-pointer py-1 px-2 md:px-[2%] md:py-[0%] text-grey-900 rounded md:p-0  h-[2.5em]" 
                        onClick={()=>{
                        setShowNavModal(!showNavModal)
                        router.push("/register")}}>
                            Registrarse
                        </button>
                    </div>
                }
                </div>
            </div>

            <ul className={`w-full md:w-[75%] flex justify-around flex-col md:p-0 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white h-full `}>
                {
                navOptions.map(item =>
                    <Link
                    onClick={()=>setShowNavModal(!showNavModal)}
                    href={{pathname:item.path}}
                    className={`${item.id == 'cart' && 'hidden relative md:flex'} hover:underline flex items-center justify-center cursor-pointer py-2 pl-3 pr-4 text-grey-900 rounded md:p-0 text-xm`}
                    key={item.id}>
                        {item.icon}
                        {item.label}
                        {item.id == 'cart' && 
                            <span
                            className="text-white hover:cursor-pointer absolute flex items-center justify-center top-[2px] right-[-10px] bg-red-600 rounded-[50%] w-[13px] h-[13px] text-[12px]">
                                {cart.length}
                            </span>
                        }
                    </Link>)
                }
                </ul>
        </div>
    )
}

export default function Navbar() {
    const {showNavModal, setShowNavModal} = useContext(GlobalContext)
    const router = useRouter()
    

    return (
        <>
            <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 h-[12vh] md:h-[29vh] lg:absolute">
                <div className="relative h-[100%] bg-white grid grid-cols-3 grid-flow-row auto-rows-max w-[100vw] flex-wrap items-center justify-between mx-auto md:py-2 border-b border-gray-200 ">
                    <div className="col-span-3 flex items-center cursor-pointer h-[13vh]">
                        <span 
                        className="hidden md:block p-[0.5rem] m-auto text-[20px] font-semibold whitespace-nowrap md:text-2xl spanTitle lg:text-[25px]"
                        onClick={()=>router.push("/")}
                        >Tejiendo redes</span>
                        <img 
                        className="h-[80%] md:h-[50%] absolute left-4 rounded-[30px] top-[5px] lg:left-[3%] md:top-[10%]" 
                        src="/images/logo2.png"
                        onClick={()=>router.push("/")}
                        ></img>
                    </div>
                    <div>
                    </div>
                    
                    <div className={`absolute right-[1%] top-0 bottom-0 flex md:order-2 gap-2`}>
                        <AbsoluteCartButton/>
                        <button
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className="inline-flex items-center p-2 text-[12px] lg:text-14px text-gray-500 rounded-lg md:hidden hover:bg-gray-100 lg:text-14px"
                            aria-controls="navbar-sticky"
                            aria-expanded='false'
                            onClick={() => setShowNavModal(!showNavModal)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <NavItems/>
                </div>
            </nav>
            <CommonModal 
            show={showNavModal} 
            setShow={setShowNavModal}
            showModalTitle={false}
            mainContent={<NavItems isModalView={true}/>}
            />
        </>
    )
}