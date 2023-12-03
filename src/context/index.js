'use client'

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { getAllProducts } from '@/src/services/admin/index';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [componentLoader, setComponentLoader] = useState({ loading: false, id: '' });
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cardDelete, setCardDelete] = useState({active:false, cardId:undefined})
  const [cardEdit, setCardEdit] = useState({active:false, cardId:undefined})
  const [productToEdit, setProductToEdit] = useState(null)
  const [reloadProducts, setReloadProducts] = useState(false)
  const [cart, setCart] = useState([])
  const [editCard, setEditCard] = useState(false)
  const [goPay, setGoPay] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [categorySelected, setCategorySelected] = useState('todos')


  // Fetch Products
  async function fetchData() {
    setComponentLoader({ loading: true, id: '' });
    try {
      const data = await getAllProducts();
      setProducts(data.data);
      setComponentLoader({ loading: false, id: '' });
    } catch (error) {
      console.error('Error al obtener productos:', error);
      setComponentLoader({ loading: false, id: '' });
    }
  }


  useEffect(() => {
    // Auth User
    if (Cookies.get('token') !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem('user')) || {};
      setUser(userData);
    } else {
      setIsAuthUser(false);
    }
    
    fetchData();
  }, []);

  useEffect(()=>{
    if(reloadProducts){
      fetchData();
      setReloadProducts(false)
    }
  }, [reloadProducts])

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        componentLoader,
        setComponentLoader,
        products,
        setProducts,
        cardDelete,
        setCardDelete,
        cardEdit, 
        setCardEdit,
        productToEdit, 
        setProductToEdit,
        reloadProducts,
        setReloadProducts,
        cart, 
        setCart,
        editCard, 
        setEditCard,
        goPay, 
        setGoPay,
        totalPrice, 
        setTotalPrice,
        categorySelected, 
        setCategorySelected
      }}>
      {children}
    </GlobalContext.Provider>
  )
}
