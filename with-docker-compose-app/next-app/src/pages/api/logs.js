import setLogLevel from '../../config/logLevelController';  // Importer la fonction externe

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { level } = req.body;

    // Modifier dynamiquement le niveau de log
    setLogLevel(level);

    res.status(200).json({ message: `Niveau de log modifié à : ${level}` });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
