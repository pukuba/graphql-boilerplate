export type RedisExpiryMode = "EX";
export type RedisTTL = number | string;
export interface RedisSetOption {
	/**
	 * EX seconds -- Set the specified expire time, in seconds.
	 * PX milliseconds -- Set the specified expire time, in milliseconds.
	 * NX -- Only set the key if it does not already exist.
	 * XX -- Only set the key if it already exist.
	 */
	expiryMode: RedisExpiryMode;
	time: RedisTTL;
}
