import { Pool } from "pg";
const connectionUri = process.env.DATABASE_URL;

// connect with db
const pool = new Pool({
  connectionString: connectionUri,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : null,
});

export default pool;
