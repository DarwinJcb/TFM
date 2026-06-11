/* prisma.config.comercial.ts: */
// npm install --save-dev prisma dotenv
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema-comercial.prisma',
  migrations: {
    path: 'prisma/migrations-comercial',
  },
  datasource: {
    url: env('DATABASE_URL_COMERCIAL'),
  },
});