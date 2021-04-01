import { Pool } from "pg";
const connectionUri = process.env.DATABASE_URL;

// connect with db
const pool = new Pool({
  connectionString: connectionUri,
});

export default pool;
