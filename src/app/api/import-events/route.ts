import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Tournament } from '@/types/tournament'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'src/data/limpopo-chess-calendar.json')
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const tournaments: Tournament[] = JSON.parse(fileContent)

    // Prepare data for insertion
    const eventsToInsert = tournaments.map(tournament => ({
      id: tournament.id,
      event_data: tournament
    }))

    // Insert into Supabase with upsert to handle duplicates
    const { data, error } = await supabaseAdmin
      .from('events')
      .upsert(eventsToInsert, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      })
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to insert tournaments into database' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      count: tournaments.length,
      message: `Successfully imported ${tournaments.length} tournaments`
    })

  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json(
      { error: 'Failed to import tournaments' },
      { status: 500 }
    )
  }
}