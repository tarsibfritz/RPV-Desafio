import React from 'react';

const Footer = () => {
  return (
    <>
      <footer id="footer" className="footer">
        <div className="copyright">
          &copy; Copyright <strong><span>COWORKING SPACE</span></strong>.
        </div>
        <div className="credits">
          <p>Todos os direitos reservados: <strong>Equipe 5 RPV</strong> </p>
        </div>
      </footer>

      <a href="/" className="back-to-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i> </a>
    </>
  );
};

export default Footer;