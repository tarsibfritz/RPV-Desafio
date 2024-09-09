import React, { useState } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { createPaymentCondition } from "../../services/paymentConditionService";
import Swal from 'sweetalert2';
import "./paymentConditions.css";

const PaymentConditionForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle('toggle-sidebar', !isSidebarOpen);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createPaymentCondition(name, description);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Condição de pagamento cadastrada com sucesso!'
      });
      setName("");
      setDescription("");
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Já existe esta condição de pagamento'
      });
    }
  };

  return (
    <>
      <body className="">
        <Header onToggleSidebar={toggleSidebar} />
        <NavBar isOpen={isSidebarOpen} />
        <main id="main" className="main">
          <div className="breadcrumb-container">
            <h1>Condição de Pagamento</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">Cadastro</li>
                <li className="breadcrumb-item active">Condição de Pagamento</li>
              </ol>
            </nav>
          </div>
          <div className="PaymentCondition-form-container">
            <form onSubmit={handleSubmit}>
              <div className="PaymentCondition-form-group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label>Forma de pagamento</label>
              </div>
              <button className="PaymentCondition-form-button" type="submit">Cadastrar</button>
            </form>
          </div>
        </main>
        <Footer />
      </body>
    </>
  );
};

export default PaymentConditionForm;