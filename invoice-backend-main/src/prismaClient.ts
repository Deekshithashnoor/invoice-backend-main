import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['query', 'info', 'warn', 'error'],
});

prisma
  .$connect()
  .then(() => {
    console.log('✅ Successfully connected to the database');
  })
  .catch((error: any) => {
    console.error('❌ Failed to connect to the database:', error);
  });

export default prisma;
