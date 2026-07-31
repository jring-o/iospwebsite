// Apply a SQL migration file to the Supabase database, using
// DIRECT_CONNECTION_STRING from .env.local (never committed).
//
// Requires the pg driver, which is not a project dependency:
//   npm i --no-save pg
// Usage:
//   node supabase/apply-migration.mjs supabase/migrations/0004_datanetwork_pins.sql
import { readFileSync } from 'node:fs'
import pg from 'pg'

const file = process.argv[2]
if (!file) {
  console.error('usage: node supabase/apply-migration.mjs <migration.sql>')
  process.exit(1)
}
const env = readFileSync('.env.local', 'utf8')
const m = env.match(/^DIRECT_CONNECTION_STRING=["']?([^"'\r\n]+)["']?$/m)
if (!m) {
  console.error('DIRECT_CONNECTION_STRING not found in .env.local')
  process.exit(1)
}
const sql = readFileSync(file, 'utf8')
const client = new pg.Client({
  connectionString: m[1].trim(),
  ssl: { rejectUnauthorized: false },
})
await client.connect()
try {
  await client.query(sql)
  console.log('applied', file)
} finally {
  await client.end()
}
