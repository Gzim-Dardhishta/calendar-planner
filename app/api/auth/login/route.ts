import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import connectMongoDB from '@/libs/db'
import User from '@/models/User'

connectMongoDB()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: 'User does not exist'}, {status: 400})
        }
        
        const validPassword = await bcryptjs.compare
        (password, user.password)
        if(!validPassword){
            return NextResponse.json({error: 'Invlid password'}, {status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        const response = NextResponse.json({
            message: 'Login successful',
            success: true,
            token: token
        })

        response.cookies.set('token', token, {
            httpOnly: true
        })

        return response

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}