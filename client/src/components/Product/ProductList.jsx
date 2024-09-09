import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllProducts, deleteProduct } from "../../services/productService";
import editImage from '../../assets/img/edit.png';
import deleteImage from '../../assets/img/delete.png';
import infosImage from '../../assets/img/infos.png';
import './productList.css';  // Importação do css
import Swal from 'sweetalert2'; // Importação do SweetAlert2

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();  // Hook para navegação

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro ao buscar espaços'
        });
      }
    };

    fetchData();
  }, []);

  // Função para deletar um produto
  const handleDelete = async (productID) => {
    const isConfirmed = await Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você realmente deseja deletar este espaço?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    });

    if (!isConfirmed.isConfirmed) return;

    try {
      await deleteProduct(productID);  // Chama a função do productService para enviar a requisição (delete)
      // Atualize a lista de produtos após deletar
      const updatedProducts = products.filter(product => product.id !== productID);  // updatedProducts = novo array com todos os produtos restantes
      setProducts(updatedProducts);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Espaço deletado com sucesso!'
      });
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Não é possível deletar o espaço pois ele está conectado a uma reserva ativa.'
      });
    }
  };

  // Função para editar um produto
  const handleEdit = (productId) => {
    navigate(`/editarProduto/${productId}`);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle('toggle-sidebar', !isSidebarOpen);
  };

  // Função para exibir a descrição do produto em um SweetAlert
  const handleInfos = (product) => {
    Swal.fire({
      title: 'Informações do Espaços',
      text: product.description || "Esse espaço não possui descrição",
      icon: 'info',
      confirmButtonText: 'Fechar'
    });
  };

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      <NavBar isOpen={isSidebarOpen} />
      <main id="main" className="main">
        <div className="">
          <h1>Listar Espaços</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Movimentações</li>
              <li className="breadcrumb-item active">Listar Espaços</li>
            </ol>
          </nav>
        </div>
        <div className='product-table-container'>
          <table className='product-table-content'>
            <thead>
              <tr>
                <th className="col-id">ID</th>
                <th className="col-name">Nome</th>
                <th className="col-location">Localização</th>
                <th className="col-capacity">Capacidade</th>
                <th className="col-rate">Valor por Hora</th>
                <th className="col-edit">Editar</th>
                <th className="col-delete">Deletar</th>
                <th className="col-infos"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="col-id">{product.id}</td>
                  <td className="col-name">{product.name}</td>
                  <td className="col-location">{product.location}</td>
                  <td className="col-capacity">{product.capacity}</td>
                  <td className="col-rate">{product.hourlyRate}</td>
                  <td>
                    <button className="product-edit-button" onClick={() => handleEdit(product.id)}>
                      <img src={editImage} alt="Editar" />
                    </button>
                  </td>
                  <td>
                    <button className="product-delete-button" onClick={() => handleDelete(product.id)}>
                      <img src={deleteImage} alt="Deletar" />
                    </button>
                  </td>
                  <td>
                    <button className="product-infos-button" onClick={() => handleInfos(product)}>
                      <img src={infosImage} alt="Informações sobre o produto" />
                    </button>
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

export default ProductList;