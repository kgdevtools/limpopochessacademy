# Limpopo Chess Calendar

A modern Next.js application for managing and displaying chess tournament information across Limpopo Province, South Africa.

## Features

- **Modern UI**: Clean, dark-themed interface with responsive design
- **Tournament Management**: Display tournaments with detailed information
- **Data Import**: Bulk import tournaments from JSON dataset
- **Supabase Integration**: Robust database with JSONB storage and indexing
- **Filtering Ready**: Architecture prepared for filtering by status, district, and venue
- **Mobile-First**: Responsive design that works on all devices

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase with PostgreSQL and JSONB storage
- **Icons**: Lucide React
- **Deployment**: Vercel-ready with automatic deployments

## Getting Started

### Prerequisites

- Node.js 18+ 
- Supabase account and project
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd limpopo-chess-calendar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Set up the database**
   - Run the SQL migration in your Supabase SQL editor:
   ```sql
   -- Copy and paste the contents of supabase/migrations/create_events_table.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Import sample data**
   - Open http://localhost:3000
   - Click "Import Tournament Data" to load sample tournaments

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── import-button.tsx # Data import functionality
│   ├── tournament-card.tsx # Tournament display
│   └── tournament-grid.tsx # Tournament listing
├── data/                 # Static data files
│   └── limpopo-chess-calendar.json
├── lib/                  # Utilities and configurations
│   └── supabase.ts       # Supabase client setup
├── types/                # TypeScript type definitions
│   └── tournament.ts     # Tournament data types
└── utils/                # Helper functions
    └── date-formatter.ts # Date formatting utilities
```

## Database Schema

The application uses a single `events` table with JSONB storage:

- `id` (text): Unique tournament identifier
- `event_data` (jsonb): Complete tournament information
- `created_at` (timestamptz): Record creation timestamp

Indexes are created for efficient querying on status, district, venue, and date fields.

## API Endpoints

- `POST /api/import-events` - Import tournaments from JSON file
- `GET /api/tournaments` - Retrieve tournaments with optional filtering
  - Query parameters: `status`, `district`, `venue`

## Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on every push

3. **Environment Variables for Production**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

## Future Enhancements

The application is architected to support:

- **User Authentication**: Multi-role support (admin, organizer, player)
- **Advanced Filtering**: Filter by status, district, venue, date range
- **Tournament Management**: Create, edit, and manage tournaments
- **Registration System**: Player registration and management
- **Results Tracking**: Tournament results and standings
- **Notifications**: Email/SMS notifications for tournament updates

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@limpopochess.co.za or create an issue in the GitHub repository.