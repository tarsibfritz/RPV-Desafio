const { Product, ReservationProducts } = require('../models');

exports.create = async (req, res) => {
  try {
    const { name, description, capacity, location, hourlyRate } = req.body;
    const photo = req.file ? req.file.path : null;

    const product = await Product.create({ name, description, capacity, location, photo, hourlyRate });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Product.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    const updatedProduct = await Product.findByPk(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    // Verificar se o produto está vinculado a alguma reserva
    const reservationProduct = await ReservationProducts.findOne({
      where: { productId },
    });

    if (reservationProduct) {
      return res.status(400).json({
        message: 'O produto não pode ser excluído, pois está vinculado a uma reserva.',
      });
    }
    const result = await Product.destroy({
      where: { id: productId },
    });

    if (result) {
      return res.status(200).json({ message: 'Produto excluído com sucesso.' });
    } else {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message + "Falha catastrofica" });
  }
};
