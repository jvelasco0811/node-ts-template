import winston from 'winston'
export const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.prettyPrint(),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.colorize(),
		winston.format.simple(),
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'combined.log' }),
	],
})
