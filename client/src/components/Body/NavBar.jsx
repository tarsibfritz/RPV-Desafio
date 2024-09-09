import React from "react";
import { logout } from '../User/auth';

const NavBar = () => {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link collapsed" href="/calendario">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </a>
          </li>
          {/* <!-- End Dashboard Nav --> */}


          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#forms-nav"
              data-bs-toggle="collapse"
              href="/"
            >
              <i className="bi bi-journal-text"></i>
              <span>Cadastro</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="forms-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <a href="/cadastroReserva">
                  <i className="bi bi-circle"></i>
                  <span>Reservas</span>
                </a>
              </li>
              <li>
                <a href="/cadastroProduto">
                  <i className="bi bi-circle"></i>
                  <span>Espaços</span>
                </a>
              </li>
              <li>
                <a href="/cadastroPagamento">
                  <i className="bi bi-circle"></i>
                  <span>Condição de Pagamento</span>
                </a>
              </li>
            </ul>
          </li>

          {/* <!-- End Forms Nav --> */}

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#tables-nav"
              data-bs-toggle="collapse"
              href="/"
            >
              <i className="bi bi-layout-text-window-reverse"></i>
              <span>Movimentações</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="tables-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <a href="/listaReserva">
                  <i className="bi bi-circle"></i>
                  <span>Listar Reservas</span>
                </a>
              </li>
              <li>
                <a href="/listaProduto">
                  <i className="bi bi-circle"></i>
                  <span>Listar Espaços</span>
                </a>
              </li>
              <li>
                <a href="/listaPagamento">
                  <i className="bi bi-circle"></i>
                  <span>Listar Formas de Pagamento</span>
                </a>
              </li>
            </ul>
          </li>
          {/* <!-- End Tables Nav --> */}

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#charts-nav"
              data-bs-toggle="collapse"
              href="/"
            >
              <i className="bi bi-file-earmark"></i>
              <span>Relatórios</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="charts-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <a href="/relatorioReservas">
                  <i className="bi bi-circle"></i>
                  <span>Reservas</span>
                </a>
              </li>
              <li>
                <a href="/relatorioProdutos">
                  <i className="bi bi-circle"></i>
                  <span>Produtos</span>
                </a>
              </li>
              <li>
                <a href="/relatorioFormaDePagamento">
                  <i className="bi bi-circle"></i>
                  <span>Formas de Pagamentos</span>
                </a>
              </li>
            </ul>
          </li>
          {/* <!-- End Charts Nav --> */}

          {/* <!-- End Register Page Nav --> */}

          <li className="nav-item">
            <button className="nav-link collapsed" onClick={logout}>
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Login</span>
            </button>
          </li>
          {/* <!-- End Login Page Nav --> */}
        </ul>
      </aside>
      {/* <!-- End Sidebar--> */}
    </>
  );
};

export default NavBar;
