import crypto from 'crypto';
import fastify from 'fastify';
import { GraphQLSchema } from 'graphql';
import mercurius from 'mercurius';

import { createMercuriusContext, initService } from './context';

export const mercuriusRegister = async (schema: GraphQLSchema) => {
	const app = fastify({
		disableRequestLogging: true,
		logger: true,
		genReqId: () => crypto.randomUUID(),
	});
	await Promise.all(initService);
	app.addHook("onRequest", (req, res, done) => {
		if (req.routerPath === "/graphql") {
			req.log.info("request");
		}
		done();
	});
	app.addHook("onResponse", (req, res, done) => {
		if (req.routerPath === "/graphql") {
			res.statusCode === 200
				? req.log.info(`response status: ${res.statusCode}`)
				: req.log.error(`response status: ${res.statusCode}`);
		}
		done();
	});
	app.register(mercurius, {
		schema,
		graphiql: true,
		jit: 0,
		context: createMercuriusContext,
	});
	return app;
};
