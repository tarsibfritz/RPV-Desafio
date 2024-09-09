const express = require('express');
const router = express.Router();
const paymentConditionController = require('../controllers/paymentConditionController');

router.post('/', paymentConditionController.create);
router.get('/', paymentConditionController.findAll);
router.get('/:id', paymentConditionController.findById);
router.put('/:id', paymentConditionController.update);
router.delete('/:id', paymentConditionController.delete);

module.exports = router;
