# Suredoor International - NGO Website

A modern, responsive website for **Suredoor International Centre for Research and Rehabilitation**, a humanitarian organization dedicated to restoring the dignity of man since 1988.

## Features

### Public Website
- **Home Page** - Hero section, about preview, programs overview, impact stats, events, and CTA
- **About Page** - Organization history, objectives, vision, and structure
- **Programs** - Three departments: Public Enlightenment, Women, and Youth
- **Gallery** - Image gallery with category filtering and lightbox
- **Blog** - News and updates with category filtering
- **Contact** - Contact form and information
- **Donate** - Donation page with amount selection and payment options

### Admin Dashboard
- **Dashboard** - Overview stats and quick actions
- **Blog Management** - Create, edit, and delete blog posts
- **Messages** - View and manage contact form submissions
- **Donations** - Track and manage donations
- **Gallery Management** - Upload and organize images
- **Settings** - Site configuration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Netlify
- **Language**: TypeScript

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/suredoor.git
   cd suredoor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the schema from `supabase/schema.sql`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000)

### Admin Access

Visit `/admin/login` to access the admin panel.

**Demo Credentials:**
- Email: `admin@suredoorintl.org.ng`
- Password: `admin123`

> Note: In production, implement proper authentication with Supabase Auth.

## Project Structure

```
suredoor/
├── src/
│   ├── app/
│   │   ├── admin/           # Admin dashboard pages
│   │   ├── about/           # About page
│   │   ├── blog/            # Blog pages
│   │   ├── contact/         # Contact page
│   │   ├── donate/          # Donation page
│   │   ├── gallery/         # Gallery page
│   │   ├── programs/        # Programs pages
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   └── layout/          # Header, Footer components
│   └── lib/
│       ├── supabase.ts      # Supabase client & types
│       └── utils.ts         # Utility functions
├── supabase/
│   └── schema.sql           # Database schema
├── public/                  # Static assets
├── .env.local.example       # Environment variables template
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Deployment to Netlify

### Option 1: Deploy via GitHub

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Customization

### Colors
Edit `tailwind.config.ts` to change the primary and secondary colors:

```typescript
colors: {
  primary: {
    // Green shades
  },
  secondary: {
    // Yellow/Gold shades
  },
}
```

### Content
- Update organization info in page components
- Add real images to `/public/images/`
- Connect to Supabase for dynamic content

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## About Suredoor International

**Suredoor International Centre for Research and Rehabilitation** is a humanitarian body established in 1988, dedicated to restoring the dignity of man through socio-cultural programmes. The organization operates through three departments:

- **Public Enlightenment Department** - Sensitizing people on topical issues
- **Women Department** - Empowering women across all spheres
- **Youth Department** - Developing tomorrow's leaders

**Vision**: "Our driving force is passion to bring back the dignity of man with the principles of love, tolerance and mutual respect for one another."

---

Built with ❤️ for Suredoor International
