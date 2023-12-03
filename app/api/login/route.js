import User from "@/src/models/user";
import { compare } from "bcryptjs";
import jwt  from "jsonwebtoken";
import connectToDB from "@/src/database";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const dynamic = 'force-dynamic'

export async function POST(req){
    await connectToDB();
    const {email, password} = await req.json();

    //Validando el schema
    const {error} = schema.validate({email, password})

    if(error){
        return NextResponse.json({
            succes: false,
            message: error.details[0].message
        })
    }

    try{
        const checkUser = await User.findOne({email})
        if(!checkUser){
            return NextResponse.json({
                succes: false,
                message: "La cuenta no fue encontrada. Por favor, vuelva a internarlo"
            })
        }
        
        
        const checkPassword = await compare(password, checkUser.password)
        if(!checkPassword){
            return NextResponse.json({
                succes: false,
                message: "La contraseña es incorrecta. Por favor, vuelva a internarlo"
            })   
        }

        const token = jwt.sign({
            id : checkUser._id, 
            email : checkUser?.email,
            role : checkUser?.role
        }, 'default_secret_key', {expiresIn : '1d'})

        const finalData = {
            token,
            user : {
                name : checkUser.name,
                email : checkUser.email,
                _id : checkUser._id,
                role : checkUser.role
            }
        }

        return NextResponse.json({
            succes : true,
            finalData 
        })

    }catch(error){
        console.log(error)
        console.log('Error in login process')

        return NextResponse.json({
            succes: false,
            message: "Algo salio mal, por favor vuelva a intentarlo"
        })
    }
}