import { z } from 'zod';

const envSchema = z.object({
	DEPLOY_MODE: z.enum(["dev", "alpha", "prod"]),
});

const constant = envSchema.parse(process.env);

export const getConstant = <T extends keyof typeof constant>(
	key: T
): typeof constant[T] => {
	return constant[key];
};
