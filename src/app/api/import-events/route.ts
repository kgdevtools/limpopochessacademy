// src/app/api/import-events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
// Assuming Tournament type is defined in src/types/tournament.ts
import { Tournament } from '@/types/tournament';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

export async function POST(request: NextRequest) {
  try {
    // Read the JSON file containing the tournament data.
    // The file path is constructed to be relative to the current working directory.
    const filePath = path.join(process.cwd(), 'src/data/limpopo-chess-calendar.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse the JSON content. We use 'any[]' here because the raw JSON structure
    // doesn't perfectly match the 'Tournament' interface directly, requiring mapping.
    const rawTournaments: any[] = JSON.parse(fileContent);

    // Get the current date for status determination, normalized to UTC midnight.
    // Using setUTCHours ensures timezone consistency for comparisons.
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    // Prepare data for insertion into the 'events' table in Supabase.
    // Each item in 'eventsToInsert' will correspond to a row in your Supabase table.
    const eventsToInsert = rawTournaments.map(rawTournament => {
      // Generate a new UUID for the 'id' column of the Supabase table.
      // This is necessary because your Supabase 'id' column expects a UUID type.
      const generatedId = uuidv4();

      // Determine the status based on dates
      let tournamentStatus: Tournament['status'];

      // Parse StartDate and normalize to UTC midnight
      const startDate = new Date(rawTournament.StartDate);
      startDate.setUTCHours(0, 0, 0, 0);

      // Parse EndDate and normalize to UTC midnight.
      // Default to StartDate if EndDate is missing or invalid.
      let endDate = startDate;
      if (rawTournament.EndDate) {
        const parsedEndDate = new Date(rawTournament.EndDate);
        parsedEndDate.setUTCHours(0, 0, 0, 0);
        if (!isNaN(parsedEndDate.getTime())) { // Check if parsedEndDate is a valid date
          endDate = parsedEndDate;
        }
      }

      // Logic to determine tournament status
      if (currentDate.getTime() > endDate.getTime()) {
        // If the current date is after the tournament's end date, it's completed.
        tournamentStatus = 'completed';
      } else if (currentDate.getTime() < startDate.getTime()) {
        // If the current date is before the tournament's start date, it's upcoming.
        tournamentStatus = 'upcoming';
      } else {
        // If the current date is on or after the start date and on or before the end date,
        // it's considered for registration/ongoing.
        tournamentStatus = 'registration';
      }

      // Map the raw JSON data to conform to your 'Tournament' interface structure.
      const mappedTournament: Tournament = {
        // The 'id' field within the 'event_data' JSONB column will store the original 'No' value.
        id: rawTournament.No,
        title: rawTournament.Tournament,
        description: "", // Placeholder: Populate as needed from your data or with a default
        date: rawTournament.StartDate,
        endDate: rawTournament.EndDate,
        venue: rawTournament.Venue,
        district: rawTournament.District,
        status: tournamentStatus, // Dynamically set status based on date logic
        rounds: parseInt(rawTournament.Rounds), // Convert 'Rounds' to an integer
        timeControl: rawTournament.TimeControl,
        format: "", // Placeholder: Populate as needed
        entryFee: "", // Placeholder: Populate as needed
        contact: rawTournament.Organiser,
        phone: "", // Placeholder: Populate as needed
        maxPlayers: 0, // Placeholder: Populate as needed
        currentPlayers: 0, // Placeholder: Populate as needed
        prizes: { // Placeholder: Populate as needed
          first: "",
          second: "",
          third: ""
        }
      };

      // Return the object structured for Supabase insertion.
      return {
        id: generatedId, // This is the UUID that will be stored in the 'id' column of the 'events' table.
        original_no: rawTournament.No, // Store the original 'No' value in a new column for reference.
        event_data: mappedTournament // Store the fully mapped tournament data as a JSONB object.
      };
    });

    // Insert the prepared data into the 'events' table in Supabase.
    // The 'upsert' method is used to either insert new rows or update existing ones.
    // 'onConflict: 'original_no'' means that if a row with the same 'original_no' value
    // already exists, the existing row will be updated instead of a new one being inserted.
    // IMPORTANT: For this 'onConflict' strategy to work correctly, your 'events' table
    // in Supabase MUST have a unique constraint on the 'original_no' column.
    // If 'original_no' is not unique, running this import multiple times will create
    // duplicate entries with new UUIDs for the 'id' column.
    const { data, error } = await supabaseAdmin
      .from('events')
      .upsert(eventsToInsert, {
        onConflict: 'original_no', // Conflict resolution based on the 'original_no' column
        ignoreDuplicates: false // Do not ignore duplicates; update them if conflict occurs
      })
      .select(); // Select the inserted/updated data

    if (error) {
      // Log the Supabase error for debugging purposes.
      console.error('Supabase error:', error);
      // Return an error response to the client.
      return NextResponse.json(
        { error: 'Failed to insert tournaments into database' },
        { status: 500 }
      );
    }

    // Return a success response with the count of imported tournaments.
    return NextResponse.json({
      success: true,
      count: eventsToInsert.length,
      message: `Successfully imported ${eventsToInsert.length} tournaments`
    });

  } catch (error) {
    // Catch any errors that occur during file reading, JSON parsing, or Supabase operations.
    console.error('Import error:', error);
    // Return a generic error response for unexpected issues.
    return NextResponse.json(
      { error: 'Failed to import tournaments' },
      { status: 500 }
    );
  }
}
