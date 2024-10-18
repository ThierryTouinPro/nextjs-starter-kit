// logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Format des logs
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Création du logger
const logger = createLogger({
  level: 'info', // Définir le niveau par défaut
  format: combine(
    colorize(),
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console(), // Logs dans la console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Logs d'erreurs dans un fichier
    new transports.File({ filename: 'logs/combined.log' }) // Tous les logs dans un autre fichier
  ],
});

// Exporter le logger pour l'utiliser dans d'autres fichiers
module.exports = logger;
