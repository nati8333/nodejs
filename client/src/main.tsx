import React from 'react'
import ReactDOM from 'react-dom/client'

import MainLayout from './components/MainLayout.tsx'

// import './scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'jquery/dist/jquery.js';
import './css/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainLayout />
  </React.StrictMode>,
)
