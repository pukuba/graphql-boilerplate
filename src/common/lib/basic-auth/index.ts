import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

import { getConstant } from '../constant';
import logger from '../logger';

export const adminAuthentication = (
	req: FastifyRequest,
	res: FastifyReply,
	done: HookHandlerDoneFunction
) => {
	const authorization = req.headers.authorization;
	if (!authorization) {
		logger.log("error", {
			message: "Unauthorized",
			id: req.id,
			headers: req.headers,
		});
		res.header("WWW-Authenticate", "Basic");
		res.status(401);
		return res.redirect(req.url);
	}

	const auth = Buffer.from(authorization.split(" ")[1], "base64")
		.toString()
		.split(":");
	const password = auth[1];
	if (password === getConstant("ADMIN_KEY")) {
		return done();
	} else {
		logger.log("error", {
			message: "Unauthorized",
			id: req.id,
			headers: req.headers,
		});
		res.header("WWW-Authenticate", "Basic");
		res.status(401);
		return res.redirect(req.url);
	}
};
