import '@lib/dotenv';
import '@lib/constant';

import cors from '@fastify/cors';
import { startApolloServer } from '@graphql/server';

import { getSchema } from './graphql/schema';

startApolloServer(getSchema());

const bootstrap = async () => {
	const { app, server } = startApolloServer(getSchema());
	await server.start();
	app.register(server.createHandler());
	app.register(cors, { origin: "*", credentials: true });
	app.listen({ port: 4000 });
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

bootstrap();
