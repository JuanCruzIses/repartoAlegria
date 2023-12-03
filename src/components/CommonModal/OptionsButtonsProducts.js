import { GlobalContext } from "@/src/context"
import { useContext, useEffect } from "react"
import '@/public/css/style.css'

export default function OptionsButtonsProducts(){
const {setCategorySelected} = useContext(GlobalContext)
useEffect(()=>{
    setCategorySelected('todos')
},[])

    return(
        <div className="pl-[1%] py-[2%]">
            <select 
            className="optionButtonsProducts rounded-[3px] text-center"
            onChange={(e)=>{
                setCategorySelected(e.target.value)
            }}
            >
                <option value='todos'>Todos los productos</option>
                <option value='frutas'>Frutas</option>
                <option value='verduras'>Verduras</option>
                <option value='granja'>Granja</option>
            </select>
        </div>
    )
}