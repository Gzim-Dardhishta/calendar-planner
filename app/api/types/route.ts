import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/utils/dbConnect'
import Type, { IType } from '@/models/Type'
import connectMongoDB from '@/libs/db'

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB()
        const types = await Type.find({})
        return NextResponse.json({ success: true, data: types }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        const data = await req.json()
        const type: IType = await Type.create(data)
        return NextResponse.json({ success: true, data: type }, { status: 201 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connectMongoDB()
        const data = await req.json()
        const type: IType | null = await Type.findByIdAndUpdate(data._id, data, { new: true })
        return NextResponse.json({ success: true, data: type }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectMongoDB()
        const data = await req.json()
        await Type.findByIdAndDelete(data._id)
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}
