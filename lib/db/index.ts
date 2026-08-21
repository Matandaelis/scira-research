import { drizzle } from 'drizzle-orm/node-postgres';
import { withReplicas } from 'drizzle-orm/pg-core';
import { serverEnv } from '@/env/server';
import * as schema from './schema';

export const maindb = drizzle(serverEnv.DATABASE_URL, {
  schema,
});

const replicaUrls = [process.env.READ_DB_1, process.env.READ_DB_2].filter(
  (url): url is string => Boolean(url),
);

const replicas = replicaUrls.map((url) => drizzle(url, { schema }));

export const db = replicas.length > 0 ? withReplicas(maindb, [replicas[0], ...replicas.slice(1)]) : maindb;

// Export all database instances for cache invalidation.
export const allDatabases = [maindb, ...replicas] as const;
