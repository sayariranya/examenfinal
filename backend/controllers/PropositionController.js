const Proposition = require('../models/Proposition');

const PropositionController = {

  create: (req, res) => {
    const { etudiant_id, titre, description } = req.body;
    if (!etudiant_id || !titre || !description) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }
    Proposition.create({ etudiant_id, titre, description }, (err, result) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur', error: err });
      res.status(201).json({ message: 'Proposition créée avec succès', id: result.insertId });
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { titre, description } = req.body;
    Proposition.findById(id, (err, rows) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      if (rows.length === 0) return res.status(404).json({ message: 'Proposition non trouvée' });

      if (rows[0].statut === 'validé') {
        return res.status(403).json({ 
          message: 'Impossible de modifier : la proposition a déjà été validée' 
        });
      }

      Proposition.update(id, { titre, description }, (err, result) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });
        res.json({ message: 'Proposition modifiée avec succès' });
      });
    });
  },

  getByEtudiant: (req, res) => {
    const { etudiant_id } = req.params;
    Proposition.findByEtudiant(etudiant_id, (err, rows) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.json(rows);
    });
  },

  valider: (req, res) => {
    const { id } = req.params;
    Proposition.valider(id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Proposition non trouvée' });
      res.json({ message: 'Proposition validée avec succès' });
    });
  }
};

module.exports = PropositionController;