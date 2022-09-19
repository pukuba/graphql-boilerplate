import { GraphQLSchema } from 'graphql';
import logger from '~/common/lib/logger';

import { makeExecutableSchema } from '@graphql-tools/schema';

import { typeDefs } from './__generated__';
import { resolvers } from './resolvers';

let schema: GraphQLSchema | null = null;

export function getSchema() {
	if (schema) {
		return schema;
	}

	schema = makeExecutableSchema({
		typeDefs,
		resolvers: resolvers,
		inheritResolversFromInterfaces: true,
		logger: {
			log(e) {
				return logger.error(e.message);
			},
		},
	});

	return schema;
}
