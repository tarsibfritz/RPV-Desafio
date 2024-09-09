import React, { useState } from "react";
import Header from "./Body/Header";
import NavBar from "./Body/NavBar";
import Footer from "./Body/Footer";
// import 'bootstrap/dist/css/bootstrap.min.css';
function Index() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle('toggle-sidebar', !isSidebarOpen);
  };

  return (
    <>
      <body className="">
        <Header onToggleSidebar={toggleSidebar} />
        <NavBar isOpen={isSidebarOpen} />
        <main id="main" className="main d-flex justify-content-center align-items-center" style={{ height: '76vh' }}>
          <div className="pagetitle text-center ">
            <img src="assets/img/NewLogo.svg" className="logo" alt="" />
          </div>
          {/* <!-- End Page Title --> */}
        </main>
        <Footer />
      </body>
    </>
  );
}

export default Index;
