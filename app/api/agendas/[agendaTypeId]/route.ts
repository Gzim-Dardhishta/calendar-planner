import Agenda from '@/models/Agenda'
import dbConnect from '@/utils/dbConnect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { agendaTypeId: string } }) {
    try {
        await dbConnect()

        const agendaTypeId = params.agendaTypeId

        const agendas = await Agenda.findOne({ _id: agendaTypeId }).populate('type')
        return NextResponse.json({ success: true, data: agendas }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest , { params }: { params: { agendaTypeId: string } }) {
    try {
        await dbConnect()

        const agendaTypeId = params.agendaTypeId

        await Agenda.findByIdAndDelete(agendaTypeId)
        
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}