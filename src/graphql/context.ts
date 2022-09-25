import { FastifyReply, FastifyRequest } from 'fastify';
import Winston from 'winston';

import logger from '@lib/logger';

export interface MercuriusContext {
	logger: Winston.Logger;
	req: FastifyRequest;
}

export const createMercuriusContext = (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	return {
		logger: logger,
		req: request,
	};
};
