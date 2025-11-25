import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          color: '#f5f5f5',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div>
            <h1>¡Oops! Algo salió mal</h1>
            <p>Estamos trabajando para arreglarlo. Por favor recarga la página.</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '2rem',
                padding: '0.5rem 1.5rem',
                backgroundColor: '#d4af37',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
