import connectMongoDB from '@/libs/db'
import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    await connectMongoDB()

    try {
        const users = await User.find()

        return NextResponse.json(users)
    } catch(error) {
        NextResponse.json({error: error})
    }
}