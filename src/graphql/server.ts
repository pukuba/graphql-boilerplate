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
		logger: {
			prettyPrint: getConstant("DEPLOY_MODE") !== "prod",
		},
		genReqId: () => crypto.randomUUID(),
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
