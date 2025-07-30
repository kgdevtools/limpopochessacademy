import { NextRequest, NextResponse } from 'next/server';
import { parseTournamentPDF } from '@/lib/parser';

export const runtime = 'nodejs'; // Ensure Node.js runtime for Buffer

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    // @ts-ignore
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const tournamentData = await parseTournamentPDF(buffer);
    return NextResponse.json({ tournamentData });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
