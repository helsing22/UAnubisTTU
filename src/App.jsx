import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Home } from './components/pages/Home';
import { Gallery } from './components/pages/Gallery';
import { Team } from './components/pages/Team';
import { Reservation } from './components/pages/Reservation';
import './styles/index.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <div className="app-container">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/galeria" element={<Gallery />} />
                <Route path="/equipo" element={<Team />} />
                <Route path="/reserva" element={<Reservation />} />
                <Route path="/contacto" element={<Reservation />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
