import Agenda from '@/models/Agenda'
import dbConnect from '@/utils/dbConnect'
import { NextRequest, NextResponse } from 'next/server'


export async function POST(req: NextRequest) {
    try {
        await dbConnect()

        const { agendas } = await req.json()

        if (!agendas || !Array.isArray(agendas)) {
            return new Response(JSON.stringify({ message: 'Invalid request body' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        const result = await Agenda.insertMany(agendas)

        return NextResponse.json({ message: 'Agendas created successfully' }, { status: 201 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}