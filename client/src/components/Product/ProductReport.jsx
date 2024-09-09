import React, { useEffect, useState } from 'react';
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllProducts } from "../../services/productService";
import "./productList.css";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ProductReport = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        alert("Erro ao buscar produtos");
      }
    };

    fetchData();
  }, []);

  function gerarPDF() {
    var docDefinition = {
      content: [
        { text: 'Relatório de Produtos', style: 'header' },
        { text: `Data de emissão: ${new Date().toLocaleDateString()}`, style: 'subheader' },
        { text: '\n' },
        {
          table: {
            headerRows: 1,
            widths: [50, '*', '*', '*', '*'],
            body: [
              [{ text: 'ID', style: 'headerTable' },
              { text: 'Nome', style: 'headerTable' },
              { text: 'Localização', style: 'headerTable' },
              { text: 'Capacidade', style: 'headerTable' },
              { text: 'Valor por hora', style: 'headerTable' }],
              ...products.map(products => ([
                { text: products.id, style: 'item' },
                { text: products.name, style: 'item' },
                { text: products.location, style: 'item' },
                { text: products.capacity, style: 'item' },
                { text: products.hourlyRate, style: 'item' },
              ])),
              [{ text: `Total: ${products.length}`, colSpan: 5, style: 'total' },
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
          <h1>Produtos</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Relatórios</li>
              <li className="breadcrumb-item active">Relatório de produtos</li>
            </ol>
          </nav>
        </div>
        <div>
          <button className="btn btn-primary" onClick={gerarPDF}>Gerar relatório de produtos</button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductReport;