import { PluginDefinition } from 'apollo-server-core';
import { GraphQLRequestListener } from 'apollo-server-plugin-base';

import logger from '@lib/logger';

const exceptionListener: GraphQLRequestListener = {
	didEncounterErrors: async (context) => {
		await Promise.resolve();
		for (const error of context.errors) {
			logger.error(
				`[ERROR] (${error?.extensions?.code || "0"}) [REQUEST] ${
					context.request?.query || ""
				}`,
				{ stack: error.stack }
			);
		}
	},
};

export const exceptionLoggingPlugin: PluginDefinition = {
	requestDidStart: async (context) => {
		return Promise.resolve(exceptionListener);
	},
};
