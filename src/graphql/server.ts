import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';
import { GraphQLSchema } from 'graphql';

import { exceptionLoggingPlugin, fastifyAppClosePlugin } from '@common/plugin';
import { getConstant } from '@lib/constant';

export const startApolloServer = (schema: GraphQLSchema) => {
	const app = fastify({
		logger: {
			prettyPrint: getConstant("DEPLOY_MODE") !== "prod",
		},
	});
	const server = new ApolloServer({
		schema,
		csrfPrevention: true,
		cache: "bounded",
		introspection: getConstant("GRAPHQL_PLAYGROUND"),
		plugins: [
			exceptionLoggingPlugin,
			fastifyAppClosePlugin(app),
			ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
			ApolloServerPluginLandingPageLocalDefault({ embed: true }),
		],
	});
	return {
		app,
		server,
	};
};
