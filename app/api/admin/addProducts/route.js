import connectToDB from "@/src/database";
import Product from "@/src/models/products";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function POST(req){
    await connectToDB()
    const {name, detail, quantity1, quantity2, quantity3, quantity4, quantity5, price1, price2, price3, price4, price5, img, stock, category} = await req.json();
    
    try{
        const newlyCreatedProduct = await Product.create({
            name, detail, quantity1, quantity2, quantity3, quantity4, quantity5, price1, price2, price3, price4, price5, img, stock, category
        })

        if(newlyCreatedProduct){
            return NextResponse.json({
                succes: true,
                message: 'El producto fue agregado correctamente'
            })
        }
    }catch(error){
        console.log('Error al agregar el producto')

        return NextResponse.json({
            succes: false,
            message: "Algo salio mal, por favor vuelva a intentarlo"
        })
    }
}