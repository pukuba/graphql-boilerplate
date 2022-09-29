import { FastifyReply, FastifyRequest } from 'fastify';
import Winston from 'winston';
import { getDataSource } from '~/config/typeorm';
import { getRedisService } from '~/core/redis';

import logger from '@lib/logger';

interface Service {
	mysql: Awaited<ReturnType<typeof getDataSource>>;
	redis: Awaited<ReturnType<typeof getRedisService>>;
}

export interface MercuriusContext {
	logger: Winston.Logger;
	req: FastifyRequest;
	service: Service;
}

export const initService: Array<Promise<Service[keyof Service]>> = [
	getDataSource(),
	getRedisService(),
];

export const createMercuriusContext = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const [mysql, redis] = await Promise.all(initService);
	const service = {
		mysql,
		redis,
	};
	return {
		logger: logger,
		req: request,
		service,
	};
};
