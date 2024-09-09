import React, { useEffect, useState } from 'react';
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllPaymentConditions } from '../../services/paymentConditionService';
import "./PaymentConditionList.css";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PaymentConditionsReport = () => {
  const [paymentConditions, setPaymentConditions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPaymentConditions();
        setPaymentConditions(response.data);
      } catch (error) {
        alert('Erro ao buscar condições de pagamento');
      }
    };

    fetchData();
  }, []);

  function gerarPDF() {
    var docDefinition = {
      content: [
        { text: 'Relatório de Formas de Pagamento', style: 'header' },
        { text: `Data de emissão: ${new Date().toLocaleDateString()}`, style: 'subheader' },
        { text: '\n' },
        {
          table: {
            headerRows: 1,
            widths: [50, '*'],
            body: [
              [{ text: 'ID', style: 'headerTable' },
              { text: 'Nome', style: 'headerTable1' }],
              ...paymentConditions.map(paymentConditions => ([
                { text: paymentConditions.id, style: 'item' },
                { text: paymentConditions.name, style: 'item' }
              ])),
              [{ text: `Total: ${paymentConditions.length}`, colSpan: 2, style: 'total' },
              {}]
            ]
          },
          style: 'tableExample'
        },
        { text: '\n' },
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          alignment: 'center'
        },
        total: {
          fontSize: 14,
          bold: true,
          alignment: 'right',
          margin: [0, 2, 10, 2]
        },
        headerTable: {
          bold: true,
          fontSize: 13,
          color: 'white',
          fillColor: '#2a3f54',
          alignment: 'center',
          margin: [0, 4, 0, 4]
        },
        headerTable1: {
          bold: true,
          fontSize: 13,
          color: 'white',
          fillColor: '#2a3f54',
          margin: [0, 4, 0, 4],
          alignment: 'left'
        },
        item: {
          margin: [0, 2, 0, 2]
        },
        footer: {
          fontSize: 10,
          margin: [0, 0, 0, 10]
        }
      },
      footer: function (currentPage, pageCount) {
        return {
          text: `Página ${currentPage} de ${pageCount}`,
          alignment: 'center',
          style: 'footer'
        };
      }
    };

    // Gerar o PDF
    pdfMake.createPdf(docDefinition).open();
  }
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle('toggle-sidebar', !isSidebarOpen);
  };

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      <NavBar isOpen={isSidebarOpen} />
      <main id="main" className="main">
        <div className="breadcrumb-container">
          <h1>Formas de Pagamentos</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Relatórios</li>
              <li className="breadcrumb-item active">Relatório de formas de pagamento</li>
            </ol>
          </nav>
        </div>
        <div>
          <button className="btn btn-primary" onClick={gerarPDF}>Gerar relatório de formas de pagamento</button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PaymentConditionsReport;