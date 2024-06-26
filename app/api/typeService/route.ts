import connectMongoDB from '@/libs/db'
import TypeService from '@/models/TypeService'
import dbConnect from '@/utils/dbConnect'
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

export interface ITypeService {
    name: string;
    category: string;
    linkedLayer?: mongoose.Schema.Types.ObjectId[]
  }

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB()
        const typesOfService = await TypeService.find({})
        return NextResponse.json({ success: true, data: typesOfService }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        const data = await req.json()
        const type: ITypeService = await TypeService.create(data)
        return NextResponse.json({ success: true, data: type }, { status: 201 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}