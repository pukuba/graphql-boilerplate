import { GraphQLScalarType } from 'graphql';
import { URLResolver } from 'graphql-scalars';

export const Scalars: Record<string, GraphQLScalarType> = {
	URL: URLResolver,
};
