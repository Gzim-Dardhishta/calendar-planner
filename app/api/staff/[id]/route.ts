
import User from '@/models/User'
import dbConnect from '@/utils/dbConnect'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect()

        const userId = params.id

        const user = await User.findOne({ _id: userId })
        return NextResponse.json({ success: true, data: user }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}