import winston from 'winston';

import { getConstant } from '@lib/constant';

const winstonConfig: winston.LoggerOptions = {
	format: winston.format.combine(
		...[
			winston.format.json(),
			...(getConstant("DEPLOY_MODE") !== "prod"
				? [winston.format.prettyPrint({ colorize: true, depth: 3 })]
				: []),
			winston.format.errors({ stack: true }),
			winston.format.timestamp(),
		]
	),
	transports: [new winston.transports.Console()],
};

export default winston.createLogger(winstonConfig);
