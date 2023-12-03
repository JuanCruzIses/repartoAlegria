import { AiFillHome } from "react-icons/ai"
import {FaCarrot} from "react-icons/fa"
import {BsPostcardHeartFill, BsBasketFill} from "react-icons/bs"
import {GiFarmer} from "react-icons/gi"


export const navOptions = [
    {
        id: "home",
        label: "Inicio",
        path: "/",
        icon:  <AiFillHome/>
    },
    {
        id: "listing",
        label: "Productos",
        path: "/productos",
        icon: <FaCarrot/>
    },
    {
        id: "about",
        label: "Nosotros",
        path: "/nosotros",
        icon: <GiFarmer/>
    },
    {
        id: "contact",
        label: "Contacto",
        path: "/contacto",
        icon: <BsPostcardHeartFill/>
    },
    {
        id: "cart",
        label: "Canasta",
        path: "/canasta",
        icon: <BsBasketFill/>
    },
]


export const registrationFormControls = [
    {
        id: 'name',
        type: 'text',
        placeholder: 'Ingrese su nombre',
        label: 'Nombre',
        componentType: 'input'
    },
    {
        id: 'email',
        type: 'email',
        placeholder: 'Ingrese su email',
        label: 'Email',
        componentType: 'input'
    },
    {
        id: 'password',
        type: 'password',
        placeholder: 'Ingrese su contraseña',
        label: 'Contraseña',
        componentType: 'input'
    },
]

export const loginFormControls = [
    {
        id: 'email',
        type: 'email',
        placeholder: 'Ingrese su email',
        label: 'Email',
        componentType: 'input'
    },
    {
        id: 'password',
        type: 'password',
        placeholder: 'Ingrese su contraseña',
        label: 'Contraseña',
        componentType: 'input'
    },
    
]

export const addProductFormControls = [
    {
        id: 'name',
        type: 'text',
        placeholder: 'Ingrese el nombre del producto',
        label: 'Nombre del producto',
        componentType: 'input'
    },
    {
        id: 'detail',
        type: 'text',
        placeholder: 'Ingrese el detalle del producto',
        label: 'Detalle',
        componentType: 'input'
    },
    {
        id: 'quantity1',
        type: 'text',
        placeholder: 'Ingrese la primer unidad de medida',
        label: 'Unidad de medida: opcion 1',
        componentType: 'input'
    },
    {
        id: 'quantity2',
        type: 'text',
        placeholder: 'Ingrese la segunda unidad de medida',
        label: 'Unidad de medida: opcion 2',
        componentType: 'input'
    },
    {
        id: 'quantity3',
        type: 'text',
        placeholder: 'Ingrese la tercer unidad de medida',
        label: 'Unidad de medida: opcion 3',
        componentType: 'input'
    },
    {
        id: 'quantity4',
        type: 'text',
        placeholder: 'Ingrese la cuarta unidad de medida',
        label: 'Unidad de medida: opcion 4',
        componentType: 'input'
    },
    {
        id: 'quantity5',
        type: 'text',
        placeholder: 'Ingrese el quinta unidad de medida',
        label: 'Unidad de medida: opcion 5',
        componentType: 'input'
    },
    {
        id: 'price1',
        type: 'number',
        placeholder: 'Ingrese el primer precio',
        label: 'Precio: opcion 1',
        componentType: 'input'
    },
    {
        id: 'price2',
        type: 'number',
        placeholder: 'Ingrese el segundo precio',
        label: 'Precio: opcion 2',
        componentType: 'input'
    },
    {
        id: 'price3',
        type: 'number',
        placeholder: 'Ingrese el tercer precio',
        label: 'Precio: opcion 3',
        componentType: 'input'
    },
    {
        id: 'price4',
        type: 'number',
        placeholder: 'Ingrese el cuarto precio',
        label: 'Precio: opcion 4',
        componentType: 'input'
    },
    {
        id: 'price5',
        type: 'number',
        placeholder: 'Ingrese el quinto precio',
        label: 'Precio: opcion 5',
        componentType: 'input'
    },
    {
        id: 'stock',
        type: 'number',
        placeholder: 'Ingrese la cantidad de stock',
        label: 'Stock',
        componentType: 'input'
    },
]

export const firebaseConfig = {
    apiKey: "AIzaSyDqMygXnIdqIxYPgGMACiAfC0_wSzsN3dk",
    authDomain: "reparto-alegria.firebaseapp.com",
    projectId: "reparto-alegria",
    storageBucket: "reparto-alegria.appspot.com",
    messagingSenderId: "88904339656",
    appId: "1:88904339656:web:1ce4f5a63ac1436af915fd",
    measurementId: "G-24YSFWCRRH"
};

export const firebaseStorageURL= 'gs://reparto-alegria.appspot.com'
