const PdfPrinter = require('pdfmake');
const fs = require('fs');

const fonts = {
  Roboto: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
  },
};

const printer = new PdfPrinter(fonts);

exports.generateReport = (data) => {
  const docDefinition = {
    content: [
      { text: 'Product Report', style: 'header' },
      ...data.map((product) => ({ text: `Name: ${product.name}, Price: ${product.price}` })),
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream('ProductReport.pdf'));
  pdfDoc.end();
};
