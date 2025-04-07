import fastify from 'fastify';
import pg from 'pg';

const app = fastify();
const pool = new pg.Pool({
  user: 'postgres',
  host: process.env.DBHOST,
  database: 'postgres',
  password: '123456',
  port: 5432,
});

app.get('/info', async (request, reply) => {
  return {
    name: 'API Application',
    version: '1.0.0',
    status: 'running'
  };
});

const start = async () => {
  const port =  Number(process.env.PORT) || 3000
  try {
    await pool.connect()
      .then(async () => {
        console.log('Database connected successfully');
        await app.listen({ port: port });
        console.log(`Server running at http://localhost:${port}`);
      });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();