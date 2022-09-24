import * as IORedis from 'ioredis';
import _ from 'lodash';
import { getConstant } from '~/common/lib/constant';
import { RedisSetOption } from '~/core/redis/redis.interface';

export const getRedisService = _.memoize(async () => {
	const redis = new IORedis.default({
		port: getConstant("REDIS_PORT"),
		host: getConstant("REDIS_HOST"),
	});
	return {
		redis,
		get: async (key: string | Buffer) => {
			return await redis.get(key);
		},
		set: async (
			key: string | Buffer,
			value: IORedis.RedisValue,
			options?: RedisSetOption
		) => {
			let cached;
			try {
				if (options) {
					cached = await redis.set(
						key,
						value,
						options.expiryMode,
						options.time
					);
				} else {
					cached = await redis.set(key, value);
				}

				if (cached === "OK") return true;
			} catch (error) {
				throw new Error(
					`Unexpected redis error(set failed): ${key} (${error})`
				);
			}
			throw new Error(`Unexpected redis error(set failed): ${key} (${cached})`);
		},
		exists: async (key: string | Buffer) => {
			const existsRes = await redis.exists(key);
			return existsRes > 0;
		},

		delete: async (key: string | Buffer) => {
			return await redis.del(key);
		},

		incr: async (key: string | Buffer) => {
			const incrRes = await redis.incr(key);
			return incrRes;
		},
		sadd: async (key: string, members: IORedis.RedisValue[]) => {
			return await redis.sadd(key, members);
		},

		sismember: async (key: string, member: string) => {
			return (await redis.sismember(key, member)) === 1 ? true : false;
		},

		smembers: async (key: string) => {
			return await redis.smembers(key);
		},

		srem: async (key: string, members: IORedis.RedisValue[]) => {
			return await redis.srem(key, members);
		},

		mget: async (keys: string[]) => {
			if (keys.length < 1) return [];
			return await redis.mget(keys);
		},

		flushAll: async () => {
			return await redis.flushall();
		},

		deleteMany: async (keys: (string | Buffer)[]) => {
			if (keys.length < 1) return 0;
			return await redis.del(keys);
		},

		keys: async (pattern: string) => {
			return await redis.keys(pattern);
		},

		scan: async (cursor: string, pattern: string) => {
			return await redis.scan(cursor, "MATCH", pattern);
		},

		multi: () => {
			return redis.multi();
		},
	};
});
