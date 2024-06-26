import Agenda from '@/models/Agenda'
import dbConnect from '@/utils/dbConnect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { agendaType: string } }) {
    try {
        await dbConnect()

        const agendaTypeId = params.agendaType

        const agendas = await Agenda.find({agendaTypeId}).populate('type')
        return NextResponse.json({ success: true, data: agendas }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}