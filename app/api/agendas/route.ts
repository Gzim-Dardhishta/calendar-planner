import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Agenda, { IAgenda } from '@/models/Agenda';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
  } catch (error) {
    console.error('Database connection error:', (error as Error).message);
    return NextResponse.json({ success: false, error: 'Database connection error' }, { status: 500 });
  }

  try {
    const data = await req.json();
    console.log('Received data:', data); // Log the received data
    const agenda: IAgenda = await Agenda.create(data);
    return NextResponse.json({ success: true, data: agenda }, { status: 201 });
  } catch (error) {
    console.error('API Error:', (error as Error).message, error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const agendas = await Agenda.find({});
    return NextResponse.json({ success: true, data: agendas }, { status: 200 });
  } catch (error) {
    console.error('API Error:', (error as Error).message, error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
