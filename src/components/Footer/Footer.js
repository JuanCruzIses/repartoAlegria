import Link from 'next/link'
import {AiOutlineWhatsApp, AiOutlineInstagram, AiTwotonePhone} from 'react-icons/ai'
import {MdLocationOn} from "react-icons/md"
import {MdEmail} from 'react-icons/md'
import "@/public/css/style.css"

export default function Footer(){
    return(
        <footer className="flex flex-wrap bg-black text-white p-[2%] h-auto md:justify-between py-[4%] px-[5%]">
            <div className='w-full flex flex-wrap md:w-[45%]'>
                <h4 className="border-b border-white-100 w-full font-400 mb-1">Contactanos</h4>
                <p className='w-full flex items-center my-1'><AiTwotonePhone className='mr-2'/>1166868433</p>
                <p className='w-full flex items-center my-1'><MdEmail className='mr-2'/>tejiendoredes.brc@gmail.com</p>
                <p className='w-full flex items-center my-1'><MdLocationOn className='mr-2'/>Calle falsa, 123</p>
            </div>
            <div className='w-full flex flex-wrap mt-[2%] md:w-[45%] md:mt-[0] md:h-full'>
                <h4 className='border-b border-white-100 w-full font-400 mb-1 mdStyleH4'>Encontranos en</h4>
                <Link href={""}><AiOutlineInstagram className='text-2xl mr-1 my-1'/></Link>
                <Link href={""}><AiOutlineWhatsApp className='text-2xl ml-1 my-1'/></Link>
            </div>

        </footer>
    )
}