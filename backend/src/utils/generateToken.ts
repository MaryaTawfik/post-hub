import jwt from 'jsonwebtoken'
import {Response} from 'express'

if(!process.env.JWT_SECRET){
    throw new Error('❌JWT SECRET is missing fom r=env variable')
}

export const sendToken =(res: Response,id:string,role:string)=>{
    const token =jwt.sign(
        {id,role},
        process.env.JWT_SECRET as string,
        {expiresIn:'7d'}

    );
    const cookieOptions ={
        expires:new Date(Date.now()+7*24*60*60*1000),
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'lax'as const,

    };
    res.cookie('token',token,cookieOptions);
};