import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { getUserInfo, logout } from '../User/auth';
import ModalHelp from '../Modal/ModalHelp';
import LogoCs from '../../assets/img/LogoCS.png'

const Header = ({ onToggleSidebar }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const user = getUserInfo();
  if (!user) {
    return <p>User not logged in</p>;
  }


  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center">
            <img src={LogoCs} alt="Logo-Coworking-Space" />
            <span className="d-none d-lg-flex">Coworking Space</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn" onClick={onToggleSidebar} ></i>
        </div>
        {/* <!-- End Logo --> */}

        <nav className="header-nav ms-auto user-info ">
          <ul className="d-flex align-items-center">

            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="/"
                data-bs-toggle="dropdown"
              >
                <img
                  //assets/img/profile-img.jpg" passar a foto por referencia da imagem  
                  src="../../assets/img/User.jpg"
                  alt="Foto do Usuario"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {user.name}
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6 className="">{user.master ? 'Administrador' : 'Usuário'}</h6>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="/usuario"
                  >
                    <i className="bi bi-person"></i>
                    <span>Usuários</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="/"
                  >
                    <i className="bi bi-gear"></i>
                    <span>Configurações</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li> */}

                <li>
                  <Button variant="primary" onClick={handleShow}
                    className="dropdown-item d-flex align-items-center"
                  >
                    <i className="bi bi-question-circle"></i>
                    <span>Ajuda?</span>
                  </Button>
                  <ModalHelp show={showModal} handleClose={handleClose}>
                    <h2>Hello</h2>
                    <p>I am a modal!</p>
                  </ModalHelp>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button className="dropdown-item d-flex align-items-center" onClick={logout} >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logof</span>
                  </button>
                </li>
              </ul>
              {/* <!-- End Profile Dropdown Items --> */}
            </li>
            {/* <!-- End Profile Nav --> */}
          </ul>
        </nav>
        {/* <!-- End Icons Navigation --> */}
      </header>
    </>
  );
};

export default Header;
