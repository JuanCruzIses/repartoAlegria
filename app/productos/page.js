import Image from 'next/image'
import '@/public/css/style.css'
import Link from 'next/link'

export default function Productos(){
    return(
        <div className="bg-white relative w-full">
            <p className="text-2xl font-medium text-center font-serif mt-[10%] mb-[7%] md:my-[4%] lg:text-3xl">Nuestros productos</p>                
            <div className='grid grid-cols-2 gap-2.5 p-2.5 lg:grid-cols-3 w-[95%] mx-auto pb-[3%]'>
                <Link href={'/productos/frutas'}>
                    <div className='relative h-[40vh]'>
                        <Image
                            loading="eager"
                            src="/images/fruta.jpg"
                            alt="Imagen de fruta"
                            width={300}
                            height={200}
                            className='absolute w-full h-full object-cover'
                        />
                        <div className='cardCategory h-full relative flex items-center flex-col text-white align-center'>
                            <h3 className='m-auto text-[22px] font-black'>Frutas</h3>
                        </div>
                    </div>
                </Link>
                <Link href={'/productos/verduras'}>
                    <div className='relative h-[40vh]'>
                        <Image
                            loading="eager"
                            src="/images/verdura.jpg"
                            alt="Imagen de fruta"
                            width={300}
                            height={200}
                            className='absolute w-full h-full object-cover'
                        />
                        <div className='cardCategory h-full relative flex items-center flex-col text-white align-center'>
                            <h3 className='m-auto text-[22px] font-black'>Verduras</h3>
                        </div>
                    </div>
                </Link>
                <Link href={'/productos/granja'}>
                    <div className='relative h-[40vh]'>
                        <Image
                            loading="eager"
                            src="/images/granja.jpg"
                            alt="Imagen de fruta"
                            width={300}
                            height={200}
                            className='absolute w-full h-full object-cover'
                        />
                        <div className='cardCategory h-full relative flex items-center flex-col text-white align-center'>
                            <h3 className='m-auto text-[22px] font-black'>Granja</h3>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}