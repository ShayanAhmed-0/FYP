import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import { migrate } from "drizzle-orm/node-postgres/migrator"

// Create a connection pool factory function to avoid issues with module resolution
export function createPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? true : false,
  })
}

// Create the drizzle client factory
export function createDb() {
  const pool = createPool()
  return drizzle(pool)
}

// Get a singleton instance of the database
let _db: ReturnType<typeof drizzle> | null = null
export function getDb() {
  if (!_db) {
    const pool = createPool()
    _db = drizzle(pool)
  }
  return _db
}

// Function to run migrations
export async function runMigrations() {
  try {
    console.log("Running migrations...")
    const db = getDb()
    await migrate(db, { migrationsFolder: "./drizzle" })
    console.log("Migrations completed successfully")
  } catch (error) {
    console.error("Error running migrations:", error)
    throw error
  }
}

// Function to test the database connection
export async function testConnection() {
  try {
    const pool = createPool()
    const result = await pool.query("SELECT NOW()")
    console.log("Database connection successful:", result.rows[0].now)
    await pool.end()
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}

// Export the db instance for convenience
export const db = getDb()
