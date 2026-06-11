/* prisma.config.interacciones.ts: */
// npm install --save-dev prisma dotenv
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema-interacciones.prisma',
  migrations: {
    path: 'prisma/migrations-interacciones',
  },
  datasource: {
    url: env('DATABASE_URL_INTERACCIONES'),
  },
});