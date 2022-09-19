import { Resolvers } from '~/graphql/__generated__';

import { Query } from './Query';

export const resolvers: Resolvers = {
	Query: {
		...Query,
	},
};
