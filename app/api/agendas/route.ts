import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/utils/dbConnect'
import Agenda from '@/models/Agenda'

export async function GET(req: NextRequest) {
    try {
        await dbConnect()
        const agendas = await Agenda.find({}).populate('type')
        return NextResponse.json({ success: true, data: agendas }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect()
        const data = await req.json()
        const agenda = new Agenda(data)
        await agenda.save()
        return NextResponse.json({ success: true, data: agenda }, { status: 201 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}
