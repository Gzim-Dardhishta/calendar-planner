import Agenda from '@/models/Agenda'
import dbConnect from '@/utils/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'



export async function DELETE(req: NextRequest) {
    try {
        await dbConnect()

        const { agendas } = await req.json()

        const agendaIds = agendas.map((agenda: any) => new ObjectId(agenda._id))
        const result = await Agenda.deleteMany({ _id: { $in: agendaIds } })

        return NextResponse.json({ success: true, message: 'Deleted all from Agendas' }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}