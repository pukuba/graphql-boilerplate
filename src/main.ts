import '@lib/dotenv';
import '@lib/constant';

import GraphQLVoyagerFastify from 'graphql-voyager-fastify-plugin';

import cors from '@fastify/cors';
import { startApolloServer } from '@graphql/server';
import { adminAuthentication } from '@lib/basic-auth';

import { getSchema } from './graphql/schema';

const bootstrap = async () => {
	const { app, server } = startApolloServer(getSchema());
	await server.start();
	app.register(server.createHandler());
	app.register(GraphQLVoyagerFastify, {
		path: "/voyager",
		endpoint: "/graphql",
	});
	app.get("/health-check", (req, res) => {
		res.send("ok").status(200);
	});
	app.addHook("onRequest", (req, res, done) => {
		if (req.routerPath === "/voyager") {
			adminAuthentication(req, res, done);
		}
		done();
	});
	app.register(cors, { origin: "*", credentials: true });
	app.listen({ port: 4000 });
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

bootstrap();
