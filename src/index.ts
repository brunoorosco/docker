
import fastify from 'fastify';

const app = fastify();

app.get('/info', async (request, reply) => {
  return {
    name: 'API Application',
    version: '1.0.0',
    status: 'running'
  };
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Server running at http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
