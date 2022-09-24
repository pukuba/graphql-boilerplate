import { ContextFunction } from 'apollo-server-core';
import { FastifyContext } from 'apollo-server-fastify';
import Winston from 'winston';

import logger from '@lib/logger';

export interface ApolloContext {
	logger: Winston.Logger;
	req: FastifyContext["request"];
}

export const createApolloContext = (): ContextFunction<FastifyContext, any> => {
	return async ({ request }) => {
		return {
			logger: logger,
			req: request,
		};
	};
};
