import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getProductById, updateProduct } from "../../services/productService";
import './productUpdate.css';  // Importação do CSS
import Swal from 'sweetalert2';  // Importação do SweetAlert2

const ProductUpdate = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao carregar o espaço',
        });
      }
    };

    fetchProduct();
  }, [productId]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle('toggle-sidebar', !isSidebarOpen);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Verificações para garantir que os valores sejam positivos
    if (parseInt(product.capacity) <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Digite um número maior que zero para a capacidade.',
      });
      return;
    }

    if (parseFloat(product.hourlyRate) <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Digite um número maior que zero para o valor por hora.',
      });
      return;
    }

    try {
      await updateProduct(productId, product);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Espaço atualizado com sucesso!',
      });
      navigate('/listaProduto');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao atualizar o espaço',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setProduct({ ...product, photo: file });
  };

  const handleCapacityChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(parseInt(value)) && parseInt(value) > 0)) {
      setProduct({ ...product, capacity: value });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Digite um número maior que zero para a capacidade.',
      });
    }
  };

  const handleHourlyRateChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(parseFloat(value)) && parseFloat(value) > 0)) {
      setProduct({ ...product, hourlyRate: value });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Digite um número maior que zero para o valor por hora.',
      });
    }
  };

  if (!product) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  // Verifica se product.photo é uma string (significa que é o caminho da imagem salvo no banco)
  const isStringPhoto = typeof product.photo === "string";

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      <NavBar isOpen={isSidebarOpen} />
      <main id="main" className="main">
        <div className="breadcrumb-container">
          <h1>Espaço {product.id}</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Movimentação</li>
              <li className="breadcrumb-item active">Editar Espaço</li>
            </ol>
          </nav>
        </div>
        <div className="update-form-container">
          <form onSubmit={handleFormSubmit} className="update-form-grid">
            <div>
              <div className="update-form-group">
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  required
                />
                <label>Nome:</label>
              </div>
              <div className="update-form-group">
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                />
                <label>Descrição:</label>
              </div>
              <div className="update-form-group">
                <input
                  type="text"
                  name="location"
                  value={product.location}
                  onChange={handleInputChange}
                  required
                />
                <label>Localização:</label>
              </div>
              <div className="update-form-group">
                <input
                  type="number"
                  name="capacity"
                  value={product.capacity}
                  onChange={handleCapacityChange}
                />
                <label>Capacidade:</label>
              </div>
              <div className="update-form-group">
                <input
                  type="number"
                  name="hourlyRate"
                  value={product.hourlyRate}
                  onChange={handleHourlyRateChange}
                />
                <label>Valor por hora:</label>
              </div>
            </div>
            <div className="update-preview-group">
              <div className="update-preview-container">
                {isStringPhoto ? (
                  <img
                    className="update-preview-image"
                    src={`http://localhost:3000/uploads/${product.photo}`}
                    alt="Preview"
                  />
                ) : (
                  <div className="update-preview-placeholder">
                    <i className="bx bxs-cloud-upload icon"></i>
                    <p>Selecione uma imagem</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                onChange={handlePhotoChange}
                accept="image/*"
              />
            </div>
            <button className="update-form-button" type="submit">Atualizar Espaço</button>
            <a href='/listaProduto' className='product-list-button'>Cancelar</a>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductUpdate;