import { Resolvers } from '../../__generated__';

export const Mutation: Resolvers["Mutation"] = {
	throw: () => {
		throw new Error("default error");
	},
};
