const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation Coworking Space',
      version: '1.0.0',
      description: 'API documentation for Product and Reservation',
    },
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['id', 'name', 'description', 'capacity', 'location', 'photo', 'hourlyRate'],
          properties: {
            id: {
              type: 'integer',
              description: 'The product ID',
            },
            name: {
              type: 'string',
              description: 'The product name',
            },
            description: {
              type: 'string',
              description: 'The product description',
            },
            capacity: {
              type: 'integer',
              description: 'The product capacity',
            },
            location: {
              type: 'string',
              description: 'The product location',
            },
            photo: {
              type: 'string',
              description: 'The product photo',
            },
            hourlyRate: {
              type: 'decimal',
              description: 'The product hourlyRate',
            },
          },
          example: {
            id: 1,
            name: 'Example Product',
            description: 'OBSERVATION',
            capacity: 1,
            location: 'XXX',
            photo: 'upload\\4b8ee0d9ee557e51e459827d25d78760',
            hourlyRate: '20.00',
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z'
          },
        },
        Reservation: {
          type: 'object',
          required: ['id', 'date', 'productId'],
          properties: {
            id: {
              type: 'integer',
              description: 'The reservation ID',
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'The reservation date',
            },
            duration: {
              type: 'integer',
              description: 'The reservation duration',
            },
            status: {
              type: 'ENUM("Aberta", "Cancelada", "Finalizada")',
              description: 'The reservation status',
            },
            repeat: {
              type: 'ENUM(("None", "Daily", "Weekly", "Monthly")',
              description: 'The reservation repeat',
            },
            repeatId: {
              type: 'integer',
              description: 'The ID of the reserved id',
            },
            totalValue: {
              type: 'Decimal',
              description: 'The reservation total value',
            },
            userId: {
              type: 'integer',
              description: 'The ID of the reserved user',
            },
            paymentConditionId: {
              type: 'integer',
              description: 'The ID of the reserved payment condition',
            },
            productId: {
              type: 'integer',
              description: 'The ID of the reserved product',
            },
          },
          example: {
            id: 1,
            date: '2024-01-01',
            duration: 1,
            status: "Aberta",
            repeat: "None",
            repeatCount: 0,
            repeatId: 0,
            totalValue: "20.00",
            userId: 1,
            paymentConditionId: 1,
            createdAt: "2024-01-01T00:00:00.000Z",
            updatedAt: "2024-01-01T00:00:00.000Z",
            productId: 1,
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos de rotas onde as anotações estarão
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
