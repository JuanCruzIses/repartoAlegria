import { Form } from "react-bootstrap"
import InputComponent from "../FormElements/InputComponent"
import DeleteProductModal from "./DeleteProductModal"
import { useContext, useEffect, useState} from "react"
import { GlobalContext } from "@/src/context"
import ButtonsAdminProduct from "./ButtonsAdminProduct"
import { addProductFormControls } from "@/src/utils"
import { updateProduct } from "@/src/services/admin/index"
import Loader from "../Loader"


export default function ProductCardEdit({product}){
    const {cardEdit, setCardEdit, cardDelete, productToEdit, realodProducts, setReloadProducts, products, setProducts, setProductToEdit} = useContext(GlobalContext)
    const [formEditData, setFormEditData] = useState({})
    const [componentLoader, setComponentLoader] = useState(false)
    const [msgProcessRequest, setMsgProcessRequest] = useState(['', null])

    useEffect(()=>{
        productToEdit != null && setFormEditData(productToEdit)
    },[productToEdit])
    
    
    //Editar el producto en la db
    async function handleUpdateProduct(){
        setComponentLoader(true)
        const updatedProducts = products.map((p) => {
            if (p._id === product._id) {
              return { ...p, ...formEditData }; // Actualizar el producto modificado
            }
            return p;
          });
    
          // Actualizar el estado local inmediatamente
          setProducts(updatedProducts);
    
        const data = await updateProduct(formEditData)
    
        if (data) {
            setComponentLoader(false)
            setMsgProcessRequest([data.message, true])
            setReloadProducts(true)
        }else{
            setProducts(products);
            setReloadProducts(false)
            setComponentLoader(false)
            setMsgProcessRequest([data.message, false])
        }
    }

    return(
        <Form
        className={`${((cardEdit.active == true && (cardEdit.cardId == product._id)) || (cardDelete.active == true && (cardDelete.cardId == product._id))) && 'pb-[15%] md:pb-[10%] h-auto grid md:grid-rows-[150px,auto,auto] md:col-span-2 lg:col-span-3 lg:grid-rows-[250px, auto] min-[425px]:pb-[6%]'} h-[40vh] shadow-lg w-[95%] m-auto relative text-center gap-2 md:h-[190px]`}>
            <DeleteProductModal product={product}/>
            <ButtonsAdminProduct product={product}/>
            <div className={`flex flex-wrap h-full max-h-[245px] ${(cardEdit.active == true && (cardEdit.cardId == product._id)) && ' md:flex-row-reverse md:items-center'}`}>
                <img src={product.img} className={`object-cover w-full h-[70%] ${(cardEdit.active == true && (cardEdit.cardId == product._id)) && ' md:w-[75px] md:h-[75px] md:rounded-[50%] md:absolute md:right-[10%]'}`}></img>
                <h3 className={`h-[30%] py-[2%] text-[14px] font-bold w-full m-auto items-center flex justify-center lg:text-[15px] ${cardEdit.active == true && (cardEdit.cardId == product._id) && 'lg:text-[20px] lg:h-full lg:pt-0 md:w-[70%]'}`}>{product.name}</h3>
            </div>
            {(cardEdit.active == true && cardEdit.cardId == product._id && formEditData != null) &&
            <>
            <div className="w-[90%] m-auto grid gap-[4%] mt-[5%] pb-[105%] min-[375px]:pb-[90%] md:grid-cols-2 md:gap-[5%] md:m-0 md:pb-[50px]">
                {addProductFormControls.map((element) => {
                    return(
                    <InputComponent 
                    key={element.id}
                    label={element.label}
                    type={element.type}
                    value={formEditData[element.id] || ''}    
                    className='h-[35px] w-[95%] m-auto items-start pt-[2%] flex justify-center'
                    onChange={(event)=>{
                        setFormEditData({...formEditData, [element.id]: event.target.value})
                    }}
                    />
                    )
                })}
                
                <Form.Group className="mb-3 relative"> 
                <label htmlFor="category" className="form-label pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white text-base left-0">Categoría:</label>
                <select
                id="category"
                className="form-select p-[3%]"
                value={formEditData.category || ''}
                onChange={(event) => {
                    setFormEditData({ ...formEditData, category: event.target.value });
                }}
                >
                <option value="">Seleccione una categoría</option>
                <option value="verduras">Verduras</option>
                <option value="frutas">Frutas</option>
                <option value="granja">Granja</option>
                </select>
                </Form.Group>
                {!componentLoader ?
                <div className={`flex w-full justify-around mb-[10%] md:col-span-2 lg:my-[3%] ${msgProcessRequest[0] != '' && 'flex flex-wrap h-auto pb-[30%] flex-col mt-[-5%] min-[425px]:mt-[-2%] min-[425px]:pb-[14%] md::pb-[5%]'}`}>
                    {msgProcessRequest[0] != '' &&
                    <p className={`text-center font-bold mb-[7%] ${msgProcessRequest[1] == true ? 'text-green' : 'text-red'}`}>{msgProcessRequest}</p>
                    }
                    <div className="flex justify-around w-full">
                        <button 
                            className='w-[35%] text-grey-900  h-full flex items-center justify-center  bg-[#5bb959] text-white  text-sm cursor-pointer min-h-[32px] py-1 px-2 md:px-[2%] md:py-[0%] text-grey-900 rounded md:p-0'
                            onClick={(e)=>{
                                e.preventDefault()
                                handleUpdateProduct()
                            }}
                        >Confirmar</button>
                        <button 
                            className='w-[35%] h-full flex items-center justify-center  bg-black text-white text-sm cursor-pointer min-h-[32px] py-1 px-2 md:px-[2%] md:py-[0%] text-grey-900 rounded md:p-0'
                            onClick={(e)=>{
                                e.preventDefault()
                                setCardEdit({active:false, cardId:undefined})
                                setFormEditData(null)
                                setMsgProcessRequest(['', null])
                                setProductToEdit(null)
                            }}
                        >Cancelar</button>
                    </div>
                </div>
                    :
                <Loader/>
                }
            </div>
            </>
            }
        </Form>
    )
}