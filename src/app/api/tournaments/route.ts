import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const district = searchParams.get('district')
    const venue = searchParams.get('venue')

    let query = supabaseAdmin
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters if provided
    if (status) {
      query = query.eq('event_data->>status', status)
    }
    if (district) {
      query = query.eq('event_data->>district', district)
    }
    if (venue) {
      query = query.ilike('event_data->>venue', `%${venue}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch tournaments' },
        { status: 500 }
      )
    }

    // Extract tournament data from the JSONB column
    const tournaments = data?.map(event => event.event_data) || []

    return NextResponse.json({
      tournaments,
      count: tournaments.length
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}