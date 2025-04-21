# SupaX Telegram Bot

A feature-rich Telegram bot for SupaX, with database integration to track user information.

## Features

- Welcome message with Mini App integration
- Help command to display available options
- About information for SupaX
- Share functionality
- User statistics tracking
- PostgreSQL database integration with Prisma

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy the `.env.example` file to `.env` and fill in your Telegram bot token and database URL:

   ```
   cp .env.example .env
   ```

4. Set up the PostgreSQL database and update the DATABASE_URL in the .env file:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   ```

5. Generate Prisma client:

   ```
   npm run prisma:generate
   ```

6. Run migrations to create the database schema:

   ```
   npm run prisma:migrate
   ```

7. Start the bot:
   ```
   npm run dev
   ```

## Database Management

- Generate Prisma client after schema changes:

  ```
  npm run prisma:generate
  ```

- Create and run migrations:

  ```
  npm run prisma:migrate
  ```

- View and edit data with Prisma Studio:
  ```
  npm run prisma:studio
  ```

## Bot Commands

- `/start` - Start the bot and see welcome message
- `/help` - Show help message
- `/about` - Learn about SupaX
- `/share` - Share the bot with friends
- `/stats` - View your usage statistics

## Mini App

The bot integrates with a Telegram Mini App. Update the Mini App URL in `src/bot.ts`:

```typescript
const miniAppUrl = "https://your-mini-app-url.com";
```

## User Tracking

The bot tracks the following user information:

- Telegram ID and username
- First and last name
- Chat ID
- Creation date
- Last activity time
- Mini App usage
- Command usage
