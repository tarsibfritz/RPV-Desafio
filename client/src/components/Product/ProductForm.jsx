import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Header from '../Body/Header';
import NavBar from '../Body/NavBar';
import Footer from '../Body/Footer';
import { createProduct } from '../../services/productService';
import './productForm.css'; // Importação do css

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null); // Para armazenar o arquivo de imagem
  const [hourlyRate, setHourlyRate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificações para garantir que os valores sejam positivos
    if (parseInt(capacity) <= 0) {
      Swal.fire('Erro', 'Por favor, digite um número maior que zero para a capacidade.', 'error');
      return;
    }

    if (parseFloat(hourlyRate) <= 0) {
      Swal.fire('Erro', 'Por favor, digite um número maior que zero para o valor por hora.', 'error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('capacity', capacity);
      formData.append('location', location);
      formData.append('photo', photo); // Adiciona o arquivo de imagem ao FormData
      formData.append('hourlyRate', hourlyRate);

      await createProduct(formData);
      Swal.fire('Sucesso', 'Espaço cadastrado com sucesso!', 'success');
      setName('');
      setDescription('');
      setCapacity('');
      setLocation('');
      setPhoto(null); // Limpa o estado da foto após o envio
      setHourlyRate('');
    } catch (error) {
      Swal.fire('Erro', 'Erro ao cadastrar espaço', 'error');
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file); // Define o arquivo selecionado como estado da foto
  };

  const handleCapacityChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(parseInt(value)) && parseInt(value) > 0)) {
      setCapacity(value);
    } else {
      Swal.fire('Atenção!', 'Digite um número maior que zero para a capacidade.', 'warning');
    }
  };


  const handleHourlyRateChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) > 0)) {
      setHourlyRate(value);
    } else {
      Swal.fire('Atenção!', 'Digite um número maior que zero para o valor por hora.', 'warning');
    }
  };

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
          <h1>Cadastro de Espaço</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Cadastro</li>
              <li className="breadcrumb-item active">Cadastro de Espaço</li>
            </ol>
          </nav>
        </div>
        {/* <!-- End Page Title --> */}
        <div className="product-form-container">
          <form onSubmit={handleSubmit} className="product-form-grid">
            {/* Lado esquerdo - campo de texto */}
            <div className="product-form-left">
              <div className="product-form-group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label>Nome:</label>
              </div>
              <div className="product-form-group">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label>Descrição:</label>
              </div>
              <div className="product-form-group">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <label>Localização:</label>
              </div>
              <div className="product-form-group">
                <input
                  type="number"
                  value={capacity}
                  onChange={handleCapacityChange}
                  required
                />
                <label>Capacidade:</label>
              </div>
              <div className="product-form-group">
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={handleHourlyRateChange}
                  required
                />
                <label>Valor por Hora:</label>
              </div>
            </div>
            {/* Lado direito - área da imagem */}
            <div className="product-form-right">
              <div className="product-preview-container">
                {photo ? (
                  <img
                    className="product-preview-image"
                    src={URL.createObjectURL(photo)}
                    alt="Preview"
                  />
                ) : (
                  <div className="product-preview-placeholder">
                    <i className="bx bxs-cloud-upload icon"></i>
                    <p>Selecione uma imagem</p>
                  </div>
                )}
              </div>
              <div className="product-form-group-image">
                <input
                  type="file"
                  onChange={handlePhotoChange} // Função para lidar com a seleção de arquivo
                  accept="image/*" // Aceitar apenas imagens
                />
              </div>
            </div>
            <button className="product-form-button" type="submit">Cadastrar</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductForm;