import { Resolvers } from '~/graphql/__generated__';

import { Mutation } from './Mutation';
import { Query } from './Query';

export const resolvers: Resolvers = {
	Mutation: {
		...Mutation,
	},
	Query: {
		...Query,
	},
};
