import '@lib/dotenv';
import '@lib/constant';

import GraphQLVoyagerFastify from 'graphql-voyager-fastify-plugin';

import cors from '@fastify/cors';
import { startApolloServer } from '@graphql/server';
import { adminAuthentication } from '@lib/basic-auth';

import { applyBullBoard } from './common/lib/apply-bull-board';
import { getSchema } from './graphql/schema';

const bootstrap = async () => {
	const { app, server } = startApolloServer(getSchema());
	await server.start();
	app.register(applyBullBoard().registerPlugin(), {
		basePath: "/queue",
		prefix: "/queue",
	});
	app.register(server.createHandler());
	app.register(GraphQLVoyagerFastify, {
		path: "/voyager",
		endpoint: "/graphql",
	});
	app.get("/health-check", (req, res) => {
		res.send("ok").status(200);
	});
	app.addHook("onRequest", (req, res, done) => {
		if (["/voyager", "/queue"].some((v) => v === req.routerPath)) {
			return adminAuthentication(req, res, done);
		}
		return done();
	});
	app.register(cors, { origin: "*", credentials: true });
	app.listen({ port: 4000 });
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

bootstrap();
