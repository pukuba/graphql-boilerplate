import winston from 'winston';

const winstonConfig: winston.LoggerOptions = {
	format: winston.format.combine(
		...[
			winston.format.json(),
			...(process.env.NODE_ENV === "development"
				? [winston.format.prettyPrint({ colorize: true, depth: 3 })]
				: []),
			winston.format.errors({ stack: true }),
			winston.format.timestamp(),
		]
	),
	transports: [new winston.transports.Console()],
};

export default winston.createLogger(winstonConfig);
