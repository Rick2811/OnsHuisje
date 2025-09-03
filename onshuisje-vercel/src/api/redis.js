import { Redis } from '@upstash/redis';

// Initialiseer de Redis-client met environment-variabelen
const redis = Redis.fromEnv();

export default redis;