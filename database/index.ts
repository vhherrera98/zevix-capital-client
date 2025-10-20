import { Pool } from 'pg';

let pool: Pool | null = null;

const conn = () => {
  if (!pool) {
    pool = new Pool({

      user: process.env.USER_PG,
      password: process.env.PASS_PG,
      host: process.env.HOST_PG,
      port: Number(process.env.PORT_PG),
      database: process.env.DB_PG,
      // ssl: {
      //   rejectUnauthorized: true
      // }
    });
  }

  // console.log("ERROR CON CONN =>" + JSON.stringify(pool, null, 2))
  return pool;
}

export { conn };