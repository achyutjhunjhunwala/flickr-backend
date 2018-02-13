import winston from 'winston';

winston.emitErrs = true;

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      name: 'CONSOLE_LOGS',
      handleExceptions: true,
      json: false,
      colorize: false,
      timestamp: true,
    }),
    new winston.transports.File({
      name: 'INFO_LOGS',
      filename: 'combined.log',
      level: 'info',
      json: true,
      colorize: true,
      timestamp: true,
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message) {
    logger.info(message.trim());
  },
};

export default logger;
