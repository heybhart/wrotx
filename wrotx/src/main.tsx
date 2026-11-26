import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;
const appTree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, appTree, {
    onRecoverableError(error) {
      // Log hydration notices without disrupting production users
      if (import.meta.env.DEV) {
        console.warn('Hydration notice:', error);
      }
    },
  });
} else {
  createRoot(rootElement).render(appTree);
}
