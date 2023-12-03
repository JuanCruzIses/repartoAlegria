import connectToDB from "@/src/database";
import Product from "@/src/models/products";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function DELETE(req){
    try{
        await connectToDB()
        const extractData = await req.json();
        const {_id} = extractData 
        console.log(_id)
        
        const deletedProduct = await Product.findByIdAndDelete(_id)
        if(deletedProduct){
            return NextResponse.json({
                succes: true,
                message: 'El producto fue eliminado correctamente'
            })
        }else{
            return NextResponse.json({
                succes: false,
                message: "Error en la eliminacion del producto, por favor vuelva a intentarlo"
            })
        }
    }catch(error){
        return NextResponse.json({
            succes: false,
            message: "Algo salio mal en el service, por favor vuelva a intentarlo"
        })
    }
}