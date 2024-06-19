'use server'
import jwt, { Jwt } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const getDataFromToken = () => {

    try {
        const cookieStore = cookies()
        const tokenC = cookieStore.get('token') 

        const token = tokenC as string | undefined

        const decodedToken:any = jwt.verify(token as string, process.env.TOKEN_SECRET!)

        return decodedToken

    } catch (error: any) {
        throw new Error(error.message)
    }
}