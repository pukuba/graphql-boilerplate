import '@lib/dotenv';
import '@lib/constant';

import GraphQLVoyagerFastify from 'graphql-voyager-fastify-plugin';

import cors from '@fastify/cors';
import { mercuriusRegister } from '@graphql/server';
import { adminAuthentication } from '@lib/basic-auth';

import { applyBullBoard } from './common/lib/apply-bull-board';
import { getSchema } from './graphql/schema';

const bootstrap = async () => {
	const app = mercuriusRegister(getSchema());
	app.register(applyBullBoard().registerPlugin(), {
		basePath: "/queue",
		prefix: "/queue",
	});
	app.register(GraphQLVoyagerFastify, {
		path: "/voyager",
		endpoint: "/graphql",
	});
	app.get("/health-check", (req, res) => {
		res.send("ok").status(200);
	});
	app.addHook("onRequest", (req, res, done) => {
		if (["/voyager", "/queue", "/graphiql"].some((v) => v === req.routerPath)) {
			return adminAuthentication(req, res, done);
		}
		return done();
	});
	app.register(cors, { origin: "*", credentials: true });
	app.listen({ port: 4000 });
	console.log(`
	🚀 Server ready at http://localhost:4000/graphql
	🚀 Playground ready at http://localhost:4000/graphiql
	🚀 Voyager ready at http://localhost:4000/voyager
	🚀 Queue ready at http://localhost:4000/queue
	`);
};

bootstrap();
