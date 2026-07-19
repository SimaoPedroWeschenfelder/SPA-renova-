import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import JsonLd from './JsonLd';

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <a href="#main" className="skip-link">Pular para o conteúdo</a>
      <JsonLd />
      <Nav />
      <main id="main" key={location.pathname} className="page-fade">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
