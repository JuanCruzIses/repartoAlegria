'use client'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addNewProduct } from "@/src/services/admin/index"
import InputComponent from "@/src/components/FormElements/InputComponent"
import { useState, useContext } from 'react';
import { GlobalContext } from "@/src/context"
import Loader from "@/src/components/Loader"
import { addProductFormControls } from "@/src/utils"
import helperUploadingImage from '@/src/utils/helperUploadingImage';

const initialFormData = {
  name: '',
  detail: '',
  quantity1: '',
  quantity2: '',
  quantity3: '',
  quantity4: '',
  quantity5: '',
  price1: '',
  price2: '',
  price3: '',
  price4: '',
  price5: '',
  img: '',
  stock: '',
  category: ''
}

export default function FormAddProduct() {
  const {setReloadProducts, user} = useContext(GlobalContext)
  const [formData, setFormData] = useState(initialFormData)
  const [componentLoader, setComponentLoader] = useState(false)
  const [msgAddProduct, setMsgAddProduct] = useState(['', null])
  const [imgUploading, setImgUploading] = useState([false, ""])
  //Subir la imagen a firebase
  async function handleImage(event) {
    setImgUploading([true, "Subiendo la imagen..."])
    const extractImageUrl = await helperUploadingImage([event.target.files[0], user])
    if(extractImageUrl !== ''){
      setImgUploading([false, "Imagen subida correctamente"])
      setFormData({
        ...formData, 
        img: extractImageUrl
      })
    }
  }
  //Crear el producto en la db
  async function handleAddProduct() {
    setComponentLoader(true)
    const data = await addNewProduct(formData)

    if (data) {
      setComponentLoader(false)
      setMsgAddProduct([data.message, true])
      setFormData(initialFormData)
      setReloadProducts(true)
    }else{
      setComponentLoader(false)
      setMsgAddProduct([data.message, false])
      setFormData(initialFormData)
      setReloadProducts(false)
    }
  }
  //Validando lo ingresado en el formulario
  function isFormValid(){
    return formData?.name && formData.name.length > 3 &&
    formData?.detail && formData.detail.length > 5 &&
    formData?.quantity1 && formData.quantity1.length > 1 &&
    formData?.quantity2 && formData.quantity2.length > 1 &&
    formData?.price1 && formData.price1.length > 1 &&
    formData?.price2 && formData.price2.length > 1 &&
    formData?.img && formData.img.length > 3 
    ? true : false
} 
  return (
    <Form className='w-[90%] grid gap-[2%] mt-[5%] md:grid-cols-2 md:gap-[5%] md:m-0 pb-[360px] md:pb-[250px]'>
      {addProductFormControls.map((element) => {
        return (
          <Form.Group key={element.id} className="mb-3">
            <InputComponent
              type={element.type}
              label={element.label}
              placeholder={element.placeholder}
              onChange={(event) => {
                setFormData({ ...formData, [element.id]: event.target.value })
                setMsgAddProduct('')  
              }}
              value={formData[element.id]}
            />
          </Form.Group>
        )
      })}

      <Form.Group className="mb-3 relative">
        <label htmlFor="category" className="form-label pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white text-base left-0">Categoría:</label>
        <select
          id="category"
          className="form-select p-[3%]"
          value={formData.category}
          onChange={(event) => {
            setFormData({ ...formData, category: event.target.value });
          }}
        >
          <option value="">Seleccione una categoría</option>
          <option value="verduras">Verduras</option>
          <option value="frutas">Frutas</option>
          <option value="granja">Granja</option>
        </select>
      </Form.Group>

      <Form.Group className="mb-3">
        <InputComponent
          label={'Imagen'}
          accept='image/*'
          max="1000000"
          type='file'
          onChange={handleImage}
        />
        {imgUploading[0] == true ? <p>{imgUploading[1]}</p> : <p>{imgUploading[1]}</p>}
      </Form.Group>

      {msgAddProduct[0] != '' &&
        <p className={`text-center font-bold md:col-span-2 md:w-[50%] md:mt-[5%] md:m-auto  ${msgAddProduct[1] == true ? 'text-green' : 'text-red'}`}>{msgAddProduct}</p>
      }
      {!componentLoader ?
        <Button
        className='disabled:opacity-50 bg-black text-white md:col-span-2 md:w-[50%] md:mt-[5%] md:m-auto lg:mt-[2%]'
        onClick={handleAddProduct}
        disabled={imgUploading[0] || !isFormValid()}
        >
          Enviar
        </Button>
        :
        <Loader/>
      }
    </Form>
  );
}
