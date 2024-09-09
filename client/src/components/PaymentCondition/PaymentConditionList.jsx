import React, { useEffect, useState } from 'react';
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import Swal from 'sweetalert2';
import { getAllPaymentConditions, deletePaymentCondition, updatePaymentCondition } from '../../services/paymentConditionService';
import editImage from '../../assets/img/edit.png';
import deleteImage from '../../assets/img/delete.png';
import confirmImage from '../../assets/img/confirm.png';
import cancelImage from '../../assets/img/cancel.png';
import "./PaymentConditionList.css";

const PaymentConditionList = () => {
  const [paymentConditions, setPaymentConditions] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({ id: '', name: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPaymentConditions();
        setPaymentConditions(response.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro ao buscar condições de pagamento'
        });
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (paymentConditionID) => {
    try {
      await deletePaymentCondition(paymentConditionID);
      // Atualiza o estado após a exclusão
      setPaymentConditions(prevConditions =>
        prevConditions.filter(paymentCondition => paymentCondition.id !== paymentConditionID)
      );
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Condição de pagamento deletada com sucesso!'
      });
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Não é possível deletar a condição de pagamento pois ela está conectado a uma reserva ativa.'
      });
    }
  };

  const handleEdit = (paymentCondition) => {
    setEditMode(paymentCondition.id);
    setEditData(paymentCondition);
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditData({ id: '', name: '' });
  }

  const handleSave = async () => {
    try {
      await updatePaymentCondition(editData.id, editData);
      const updatedPaymentConditions = paymentConditions.map((paymentCondition) =>
        paymentCondition.id === editData.id ? editData : paymentCondition
      );
      setPaymentConditions(updatedPaymentConditions);
      setEditMode(null);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Condição de pagamento atualizada com sucesso!'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao atualizar condição de pagamento.'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
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
          <h1>Listar Formas de Pagamentos</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Movimentações</li>
              <li className="breadcrumb-item active">Listar Formas de Pagamento</li>
            </ol>
          </nav>
        </div>

        <div className='paymentConditions-table-container'>
          <table className='paymentConditions-table-content'>
            <thead>
              <tr>
                <th className="col-id">ID</th>
                <th className="col-name">Forma de Pagamento</th>
                <th className="col-edit"></th>
                <th className="col-delete"></th>
              </tr>
            </thead>
            <tbody>
              {paymentConditions.map((paymentCondition) => (
                <tr key={paymentCondition.id}>
                  <td className="col-id">{paymentCondition.id}</td>
                  <td className="col-name">
                    {editMode === paymentCondition.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                      />
                    ) : (
                      paymentCondition.name
                    )}
                  </td>
                  <td>
                    {editMode === paymentCondition.id ? (
                      <button className="paymentConditions-save-button" onClick={handleSave}>
                        <img src={confirmImage} alt="Salvar" />
                      </button>
                    ) : (
                      <button className="paymentConditions-edit-button" onClick={() => handleEdit(paymentCondition)}>
                        <img src={editImage} alt="Editar" />
                      </button>
                    )}
                  </td>
                  <td>
                    {editMode === paymentCondition.id ? (
                      <button className="paymentConditions-cancel-button" onClick={handleCancel}>
                        <img src={cancelImage} alt="Cancelar" />
                      </button>
                    ) : (
                      <button className="paymentConditions-delete-button" onClick={() => handleDelete(paymentCondition.id)} >
                        <img src={deleteImage} alt="Deletar" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PaymentConditionList;