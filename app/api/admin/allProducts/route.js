import connectToDB from "@/src/database";
import Product from "@/src/models/products";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(){
    try {
        await connectToDB();
        const extractAllProducts = await Product.find({});
        console.log(extractAllProducts)
        
        if(extractAllProducts.length > 0){
            return NextResponse.json({
                success: true,
                data: extractAllProducts
            });
        } else {
            return NextResponse.json({
                success: false,
                status: 404, // Cambiado a código de respuesta HTTP 404
                message: 'No se encontraron productos'
            });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            status: 500, // Código de respuesta HTTP 500 para errores internos del servidor
            message: 'Error interno del servidor al obtener productos'
        });
    }
}
