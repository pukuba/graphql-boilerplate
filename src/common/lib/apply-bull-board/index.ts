import { createBullBoard } from '@bull-board/api';
import { FastifyAdapter } from '@bull-board/fastify';

export const applyBullBoard = () => {
	const serverAdapter = new FastifyAdapter();
	createBullBoard({
		queues: [],
		serverAdapter,
	});

	return serverAdapter;
};
