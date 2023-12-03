import connectToDB from "@/src/database";
import User from "@/src/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

//Validaciones con biblioteca Joi
const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required()
})

export const dynamic = 'force-dynamic';

export async function POST(req){
    await connectToDB()
    const {name, email, password, role} = await req.json();
  
    //Validando el schema
    const {error} = schema.validate({name, email, password, role})

    if(error){
        return NextResponse.json({
            succes: false,
            message: error.details[0].message
        })
    }

    try{
        //Chequear si el usuario ya existe
        const userAllReadyExist = await User.findOne({email})

        if(userAllReadyExist){
            return NextResponse.json({
                succes: false,
                message: 'El usuario ya se encuentra registrado'
            })
        }else{
            const hashPassword = await hash(password, 12)
            const newlyCreatedUser = await User.create({
                name, email, password : hashPassword, role, token:null
            })

            if(newlyCreatedUser){
                return NextResponse.json({
                    succes: true,
                    message: 'El usuario fue registrado correctamente'
                })
            }
        }

    }catch(error){
        console.log('Error in registration process')

        return NextResponse.json({
            succes: false,
            message: "Algo salio mal, por favor vuelva a intentarlo"
        })
    }
}