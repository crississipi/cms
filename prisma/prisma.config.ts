// Prisma 7 configuration – connection URL is supplied via environment variable.
// This file is used by `prisma generate` and migrations.

export default {
  datasource: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};
