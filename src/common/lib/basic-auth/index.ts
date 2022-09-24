import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

import { getConstant } from '../constant';

export const adminAuthentication = (
	req: FastifyRequest,
	res: FastifyReply,
	done: HookHandlerDoneFunction
) => {
	const authorization = req.headers.authorization;
	if (!authorization) {
		const err = new Error("Unauthorized");
		res.header("WWW-Authenticate", "Basic");
		res.status(401);
		return done(err);
	}

	const auth = Buffer.from(authorization.split(" ")[1], "base64")
		.toString()
		.split(":");
	const password = auth[1];
	if (password === getConstant("ADMIN_KEY")) {
		done();
	} else {
		const err = new Error("Unauthorized");
		res.header("WWW-Authenticate", "Basic");
		res.status(401);
		return done(err);
	}
};
