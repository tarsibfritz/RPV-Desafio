import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const BootstrapModal = ({ show, handleClose, children }) => {
  const apiUrl = "http://localhost:3000/api-docs/";
  const apiUrlProd = "https://projetocoworking-production.up.railway.app/api-docs/";

  const openNewTab = async () => {
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        window.open(apiUrl, '_blank');
      } else {
        throw new Error('Local API URL not accessible');
      }
    } catch (error) {
      window.open(apiUrlProd, '_blank');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajuda</Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex justify-content-center align-items-center'>
        <div className='d-flex flex-column align-items-center'>
          <h5 className='mb-3'>Segue o link para acesso da API</h5>
          <Button className='pl-5 pr-5' variant="success" onClick={openNewTab}>
            API
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BootstrapModal;
