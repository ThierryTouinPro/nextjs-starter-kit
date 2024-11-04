const logger = require('./winston');

// Fonction pour modifier dynamiquement le niveau de log
const setLogLevel = (level) => {
  const validLogLevels = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'];
  
  if (validLogLevels.includes(level)) {
    logger.level = level;
    console.log(`Niveau de log modifié à : ${level}`);
  } else {
    console.error(`Niveau de log invalide : ${level}`);
  }
};

module.exports = setLogLevel;
