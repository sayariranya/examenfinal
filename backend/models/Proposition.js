const db = require('../config/db');

const Proposition = {
  create: (data, callback) => {
    const sql = `INSERT INTO propositions (etudiant_id, titre, description, statut, created_at) 
                 VALUES (?, ?, ?, 'en_attente', NOW())`;
    db.query(sql, [data.etudiant_id, data.titre, data.description], callback);
  },

  findById: (id, callback) => {
    const sql = `SELECT * FROM propositions WHERE id = ?`;
    db.query(sql, [id], callback);
  },

  update: (id, data, callback) => {
    const sql = `UPDATE propositions 
                 SET titre = ?, description = ?, updated_at = NOW() 
                 WHERE id = ? AND statut != 'validé'`;
    db.query(sql, [data.titre, data.description, id], callback);
  },

  findByEtudiant: (etudiant_id, callback) => {
    const sql = `SELECT * FROM propositions WHERE etudiant_id = ?`;
    db.query(sql, [etudiant_id], callback);
  },

  valider: (id, callback) => {
    const sql = `UPDATE propositions SET statut = 'validé', updated_at = NOW() WHERE id = ?`;
    db.query(sql, [id], callback);
  }
};

module.exports = Proposition;