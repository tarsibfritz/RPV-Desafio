const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./models');
const { swaggerUi, specs } = require('./docs/swagger');
const app = express( );
app.use(express.json());
dotenv.config();
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); // Middleware para Swagger
app.use('/', require('./routes'));

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', '/'));
});

const PORT = process.env.PORT_APP || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
