import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Servicos = lazy(() => import('./pages/Servicos'));
const Sobre = lazy(() => import('./pages/Sobre'));
const Contato = lazy(() => import('./pages/Contato'));
const Avaliar = lazy(() => import('./pages/Avaliar'));

export default function App() {
  return (
    <Suspense fallback={<div className="visually-hidden">Carregando…</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
        </Route>
        <Route path="/avaliar" element={<Avaliar />} />
      </Routes>
    </Suspense>
  );
}
