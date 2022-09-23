import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-fastify';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import fastify, { FastifyInstance } from 'fastify';
import { GraphQLSchema } from 'graphql';

import { exceptionLoggingPlugin } from '@common/exception';
import { getConstant } from '@lib/constant';

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
	return {
		async serverWillStart() {
			return {
				async drainServer() {
					await app.close();
				},
			};
		},
	};
}

export async function startApolloServer(schema: GraphQLSchema) {
	const app = fastify({
		logger: {
			prettyPrint: getConstant("DEPLOY_MODE") === "prod" ? false : true,
		},
	});
	const server = new ApolloServer({
		schema,
		csrfPrevention: true,
		cache: "bounded",
		plugins: [
			exceptionLoggingPlugin,
			fastifyAppClosePlugin(app),
			ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
			ApolloServerPluginLandingPageLocalDefault({ embed: true }),
		],
	});
	await server.start();
	app.register(server.createHandler());
	await app.listen({ port: 4000 });
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
