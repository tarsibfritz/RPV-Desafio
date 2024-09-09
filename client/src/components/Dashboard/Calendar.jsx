import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import moment from "moment";
import 'moment/locale/pt-br';
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./calendar.css";

moment.locale('pt-br');
const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

// Definido as mensagens em português
const messages = {
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  allDay: 'Dia inteiro',
  week: 'Semana',
  work_week: 'Semana de trabalho',
  day: 'Dia',
  month: 'Mês',
  previous: 'Anterior',
  next: 'Próximo',
  yesterday: 'Ontem',
  tomorrow: 'Amanhã',
  today: 'Hoje',
  agenda: 'Agenda',
  noEventsInRange: 'Não há eventos neste intervalo.',
  showMore: total => `+${total} mais`,
};

const Calendario = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    // Fetch reservations da API 
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/reservations", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const reservations = response.data;
        // Incluindo os enventos das tarefas no calendário
        const calendarEvents = reservations
          .filter(reservation => reservation.status === "Aberta")
          .map(reservation => ({
            id: reservation.id,
            title: `Reserva ${reservation.id}`,
            start: new Date(reservation.date),
            end: new Date(new Date(reservation.date).getTime() + reservation.duration * 60 * 60 * 1000), // Calcula a data de término com base na duração em horas
            desc: `Status: ${reservation.status}`
          }));
        setEventos(calendarEvents);
      } catch (error) {
        console.error("Error fetching reservations:", error.response.data);
      }
    };
    fetchReservations();
  }, []);

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
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active">Calendário</li>
            </ol>
          </nav>
        </div>
        <div>
          <DragAndDropCalendar
            defaultDate={moment().toDate()}
            defaultviews="month"
            events={eventos}
            localizer={localizer}
            resizable
            className="calendar"
            messages={messages}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Calendario;
