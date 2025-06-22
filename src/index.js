import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa o componente principal App

// Cria o ponto de montagem para o aplicativo React no elemento com id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente App dentro do modo estrito do React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
