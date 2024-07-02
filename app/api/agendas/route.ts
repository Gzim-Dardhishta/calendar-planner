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

export async function PUT(req: NextRequest) {
    try {
        await dbConnect()
        const data = await req.json()
        const type = await Agenda.findByIdAndUpdate(data._id, data, { new: true })
        return NextResponse.json({ success: true, data: type }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await dbConnect()
        const type = await Agenda.deleteMany({})
        return NextResponse.json({ success: true, message: 'Deleted all from Agendas' }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}
