import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import '@fontsource-variable/geist';
import './styles.css';
import App from './App';

// Hash routes support direct links and refreshes on static hosts, including GitHub Pages subpaths.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
