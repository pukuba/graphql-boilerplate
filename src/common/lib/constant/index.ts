import { z } from 'zod';

const envSchema = z.object({
	DEPLOY_MODE: z.enum(["dev", "alpha", "prod"]),
	GRAPHQL_PLAYGROUND: z.enum(["true", "false"]).transform((v) => v === "true"),
	LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]),
	REDIS_PORT: z.string().transform((v) => parseInt(v)),
	REDIS_HOST: z.string(),
	ADMIN_KEY: z.string(),
	DB_HOST: z.string(),
	DB_PORT: z.string().transform((v) => parseInt(v)),
	DB_USERNAME: z.string(),
	DB_PASSWORD: z.string(),
	DB_DATABASE: z.string(),
});

const constant = envSchema.parse(process.env);

export const getConstant = <T extends keyof typeof constant>(
	key: T
): typeof constant[T] => {
	return constant[key];
};
