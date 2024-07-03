
import User from '@/models/User'
import { UserI } from '@/ts'
import dbConnect from '@/utils/dbConnect'
import { usersToUsersDTO } from '@/utils/DTOs'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect()

        const userId = params.id

        const user = await User.findOne({ _id: userId })
        const userDTO = usersToUsersDTO(user)

        return NextResponse.json({ success: true, data: userDTO }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect()
  
        const userId = params.id
        const data = await req.json()
  
        console.log('Received data:', data)
  
        const user: UserI | null = await User.findByIdAndUpdate(userId, data, { new: true })
  
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
        }
  
        return NextResponse.json({ success: true, data: user }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}