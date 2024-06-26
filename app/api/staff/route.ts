import connectMongoDB from '@/libs/db'
import User from '@/models/User'
import { usersToUsersDTO } from '@/utils/DTOs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    await connectMongoDB()

    try {
        const users = await User.find({})

        const usersDTO = users.map((user) => usersToUsersDTO(user))

        return NextResponse.json({ success: true, data: usersDTO }, { status: 200 })
    } catch(error) {
        NextResponse.json({error: error})
    }
}