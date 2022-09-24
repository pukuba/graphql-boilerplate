import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-fastify';
import crypto from 'crypto';
import fastify from 'fastify';
import { GraphQLSchema } from 'graphql';

import { exceptionLoggingPlugin, fastifyAppClosePlugin } from '@common/plugin';
import { getConstant } from '@lib/constant';
import { executor } from '@lib/jit-executor';

import { createApolloContext } from './context';

export const startApolloServer = (schema: GraphQLSchema) => {
	const app = fastify({
		disableRequestLogging: true,
		logger: {
			prettyPrint: {
				messageFormat: "{level} - {msg} - {pid} - {reqId}",
				colorize: getConstant("DEPLOY_MODE") !== "prod",
				translateTime: "SYS:h:MM:ss TT Z o",
				levelFirst: true,
			},
			level: getConstant("LOG_LEVEL"),
		},
		genReqId() {
			return crypto.randomUUID();
		},
	});
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
	const server = new ApolloServer({
		schema,
		csrfPrevention: true,
		cache: "bounded",
		introspection: getConstant("GRAPHQL_PLAYGROUND"),
		context: createApolloContext(),
		plugins: [
			exceptionLoggingPlugin,
			fastifyAppClosePlugin(app),
			ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
			ApolloServerPluginLandingPageLocalDefault({ embed: true }),
		],
		executor,
	});
	return {
		app,
		server,
	};
};
