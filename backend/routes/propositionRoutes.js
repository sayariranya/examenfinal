const express = require('express');
const router = express.Router();
const PropositionController = require('../controllers/PropositionController');

router.post('/', PropositionController.create);
router.put('/:id', PropositionController.update);
router.get('/etudiant/:etudiant_id', PropositionController.getByEtudiant);
router.patch('/:id/valider', PropositionController.valider);

module.exports = router;