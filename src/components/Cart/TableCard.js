'use client'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GlobalContext } from "@/src/context"
import { useContext, useState, useEffect } from "react"
import ButtonEdit from './ButtonEdit';
import FormBuyCart from './FormBuyCart';
import CartEmptyModal from './CartEmptyModal';

export default function DenseTable() {
    const {products, cart, setCart, editCard, setEditCard, totalPrice, setTotalPrice} = useContext(GlobalContext)
    const [heard, setHeard] = useState(false)

    useEffect(()=>{
      setEditCard(false)
    },[])
    useEffect(()=>{
      let partialPrice = 0
      cart?.length && cart.map(element => {
        partialPrice = partialPrice+element.precio
      })
      setTotalPrice(partialPrice)
      heard && setHeard(false)
    },[heard])
    
    const updateCart = (param)=>{
      cart.find((element) =>{
        if(element.productId == param.productId){
          element.cantidad = param.cantidad
          element.precio = param.precio
        } 
      })
      !heard && setHeard(true)
      setCart(cart)
    }
    const deleteProductToCart = (param)=>{
      const updatedCart = cart.filter((product) => product.productId !== param);
      !heard && setHeard(true)
      setCart(updatedCart);
    }

  return (
    cart && !cart.length ?
      <CartEmptyModal/>      
    :
      <>
      <ButtonEdit/>
      <TableContainer component={Paper} className={`tableCart ${!cart.length && 'h-[40vh] flex items-center justify-center text-center md:w-[95%] md:m-auto'}`}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '40vh'}} align="center">Producto</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">{!editCard && 'Precio'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {cart.map((element) => {
            const product = products.find((p) => p._id === element.productId);
            if(product){ 
              return(
                  <TableRow key={product._id}>
                      <TableCell component="th" scope="row" style={{ width: '40vh', display:'flex', alignItems:'center' }}>
                          <img className='w-[30%] object-cover h-[40px] mr-[3%] rounded-sm' src={product.img}></img>
                          <p>{product.name}</p>
                      </TableCell>
                      {!editCard ?
                        <TableCell align="center">
                          {element.cantidad}
                        </TableCell>
                      :
                        <TableCell>
                        <select
                        className='m-auto p-0 h-full bg-[#5bb959] text-white text-center rounded-md flex'
                        defaultValue={element.cantidad}
                        onChange={(e)=>{
                          updateCart(JSON.parse(e.target.value))}}
                        >
                            <option>{element.cantidad}</option>
                            {(product.quantity1 != element.cantidad && product.price1) && <option value={JSON.stringify({productId: product._id, cantidad: product.quantity1, precio:product.price1})}>{product.quantity1}</option> }
                            {(product.quantity2 != element.cantidad && product.price2) && <option value={JSON.stringify({productId: product._id, cantidad: product.quantity2, precio:product.price2})}>{product.quantity2}</option> }
                            {(product.quantity3 != element.cantidad && product.price3) && <option value={JSON.stringify({productId: product._id, cantidad: product.quantity3, precio:product.price3})}>{product.quantity3}</option> }
                            {(product.quantity4 != element.cantidad && product.price4) && <option value={JSON.stringify({productId: product._id, cantidad: product.quantity4, precio:product.price4})}>{product.quantity4}</option> }
                            {(product.quantity5 != element.cantidad && product.price5) && <option value={JSON.stringify({productId: product._id, cantidad: product.quantity5, precio:product.price5})}>{product.quantity5}</option> }
                        </select>
                        </TableCell>
                      }
                      <TableCell align="center">
                        {!editCard ? 
                          '$'+element.precio 
                        : 
                        <button 
                        className='m-auto px-2 h-full bg-red-700 text-white text-center rounded-md flex'
                        onClick={()=>deleteProductToCart(product._id)}
                        >Eliminar</button>
                        }
                      </TableCell>
                  </TableRow>
              )
            }
          })}
            <TableRow>
              <TableCell style={{ width: '40vh', display:'flex', alignItems:'center', borderBottom: '0' }}>
                <p className='font-bold text-green-700'>Total: ${totalPrice}</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <FormBuyCart/>
      </>
  );
}
