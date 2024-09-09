import React, { useEffect, useState } from 'react';
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllReservations } from "../../services/reservationService";
import "./ReservationForm.css";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ProductReport = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllReservations();
        setReservations(response.data);
      } catch (error) {
        alert("Erro ao buscar reservas");
      }
    };

    fetchData();
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
      document.body.classList.toggle('toggle-sidebar', !isSidebarOpen);
    };
  function formatDate(dateString) {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 3);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  function gerarPDF() {
    var docDefinition = {
      content: [
        { text: 'Relatório de Reservas', style: 'header' },
        { text: `Data de emissão: ${new Date().toLocaleDateString()}`, style: 'subheader' },
        { text: '\n' },
        {
          table: {
            headerRows: 1,
            widths: [40, 150, 50, 50, 50, 110],
            body: [
              [{ text: 'ID', style: 'headerTable' },
              { text: 'Data e hora', style: 'headerTable' },
              { text: 'Duração', style: 'headerTable' },
              { text: 'Status', style: 'headerTable' },
              { text: 'Repetir', style: 'headerTable' },
              { text: 'Valor Total', style: 'headerTable' }],
              ...reservations.map(reservations => ([
                { text: reservations.id, style: 'item' },
                { text: formatDate(reservations.date), style: 'item' },
                { text: reservations.duration, style: 'item' },
                { text: reservations.status, style: 'item' },
                { text: reservations.repeat, style: 'item' },
                { text: "R$ "+reservations.totalValue, style: 'item' },
              ])),
              [{ text: `Total: ${reservations.length}`, colSpan: 6, style: 'total' },
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

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      <NavBar isOpen={isSidebarOpen} />
      <main id="main" className="main">
        <div className="breadcrumb-container">
          <h1>Reservas</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Relatórios</li>
              <li className="breadcrumb-item active">Relatório de reservas</li>
            </ol>
          </nav>
        </div>
        <div>
          <button className="btn btn-primary" onClick={gerarPDF}>Gerar relatório de reservas</button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductReport;