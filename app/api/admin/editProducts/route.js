import connectToDB from "@/src/database";
import Product from "@/src/models/products";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function PUT(req){
    try{
        await connectToDB()
        const extractData = await req.json();
        const {_id, name, detail, quantity1, quantity2, quantity3, quantity4, quantity5, price1, price2, price3, price4, price5, stock, category} = extractData 
        
        const updatedProduct = await Product.findOneAndUpdate(
            {_id: _id},
            {name, detail, quantity1, quantity2, quantity3, quantity4, quantity5, price1, price2, price3, price4, price5, stock, category},
            {new: true}
        )
            

        if(updatedProduct){
            return NextResponse.json({
                succes: true,
                message: 'El producto fue actualizado correctamente'
            })
        }else{
            return NextResponse.json({
                succes: false,
                message: "Error en la actualizacion del producto, por favor vuelva a intentarlo"
            })
        }
    }catch(error){
        return NextResponse.json({
            succes: false,
            message: "Algo salio mal en el service, por favor vuelva a intentarlo"
        })
    }
}