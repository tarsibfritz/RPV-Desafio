const express = require('express');
const router = express.Router();
const paymentConditionRoutes = require('./paymentConditionRoutes');
const productRoutes = require('./productRoutes');
const reservationRoutes = require('./reservationRoutes');
const authRoutes = require('./auth');
const userRoutes = require('./userRoutes');

router.use('/api', authRoutes);
router.use('/products', productRoutes);
router.use('/payment-conditions', paymentConditionRoutes);
router.use('/reservations', reservationRoutes);
router.use('/users', userRoutes);
module.exports = router;
