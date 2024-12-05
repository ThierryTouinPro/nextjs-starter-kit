import logger from './winston';

// Fonction pour modifier dynamiquement le niveau de log
const setLogLevel = (level: string): void => {
  const validLogLevels: string[] = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'];
  
  if (validLogLevels.includes(level)) {
    logger.level = level;
    console.log(`Niveau de log modifié à : ${level}`);
  } else {
    console.error(`Niveau de log invalide : ${level}`);
  }
};

export default setLogLevel;
