import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { FastifyInstance } from 'fastify';

export const fastifyAppClosePlugin = (
	app: FastifyInstance
): ApolloServerPlugin => {
	return {
		async serverWillStart() {
			return {
				async drainServer() {
					await app.close();
				},
			};
		},
	};
};
