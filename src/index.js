import { setupServer } from './server.js';
import { initMongoConnection } from './db/connection.js';
import 'dotenv/config';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
