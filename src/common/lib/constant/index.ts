import { z } from 'zod';

const envSchema = z.object({
	DEPLOY_MODE: z.enum(["dev", "alpha", "prod"]),
	GRAPHQL_PLAYGROUND: z.enum(["true", "false"]).transform((v) => v === "true"),
});

const constant = envSchema.parse(process.env);

export const getConstant = <T extends keyof typeof constant>(
	key: T
): typeof constant[T] => {
	return constant[key];
};
