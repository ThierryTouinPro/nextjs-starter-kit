const winston = require('winston');

// Créer une instance de logger avec des transports pour les fichiers et la console
const logger = winston.createLogger({
  level: 'info',  // Niveau de log par défaut
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
});

// Ajouter une sortie console pour le développement
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;
