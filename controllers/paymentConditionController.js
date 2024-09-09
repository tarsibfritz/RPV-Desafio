const { PaymentCondition } = require('../models');

exports.create = async (req, res) => {
  try {
    const paymentCondition = await PaymentCondition.create(req.body);
    res.status(201).json(paymentCondition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const paymentConditions = await PaymentCondition.findAll();
    res.status(200).json(paymentConditions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentCondition = await PaymentCondition.findByPk(id);
    if (!paymentCondition) {
      return res.status(404).json({ error: 'Condição de pagamento não encontrada' });
    }
    res.status(200).json(paymentCondition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await PaymentCondition.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ error: 'Condição de pagamento não encontrada' });
    }
    const updatedPaymentCondition = await PaymentCondition.findByPk(id);
    res.status(200).json(updatedPaymentCondition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PaymentCondition.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Condição de pagamento não encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
