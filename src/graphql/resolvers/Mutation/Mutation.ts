import { ApolloError } from 'apollo-server-core';

import { Resolvers } from '../../__generated__';

export const Mutation: Resolvers["Mutation"] = {
	throw: () => {
		throw new ApolloError("default error");
	},
};
