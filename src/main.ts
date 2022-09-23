import '@lib/dotenv';
import '@lib/constant';

import { startApolloServer } from './app';
import { getSchema } from './graphql/schema';

startApolloServer(getSchema());
