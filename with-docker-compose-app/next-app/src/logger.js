let logger = null;

if (typeof window === 'undefined') {
  // Winston ne doit être importé que côté serveur
  const { createLogger, format, transports } = require('winston');
  const { combine, timestamp, printf, colorize } = format;

  const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  });

  logger = createLogger({
    level: 'info',
    format: combine(
      colorize(),
      timestamp(),
      logFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' }),
    ],
  });
} else {
  // Si le code est exécuté côté client, ne pas charger Winston
  logger = console; // Utiliser console.log pour les logs client-side
}

module.exports = logger;
