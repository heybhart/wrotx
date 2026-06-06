import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error overlay for debugging runtime crashes
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'fixed';
    errorDiv.style.top = '0';
    errorDiv.style.left = '0';
    errorDiv.style.width = '100vw';
    errorDiv.style.height = '100vh';
    errorDiv.style.backgroundColor = 'rgba(15, 10, 25, 0.95)';
    errorDiv.style.color = '#f43f5e';
    errorDiv.style.zIndex = '999999';
    errorDiv.style.padding = '40px';
    errorDiv.style.fontFamily = 'monospace';
    errorDiv.style.overflow = 'auto';
    errorDiv.innerHTML = `
      <div style="max-w-4xl mx-auto border border-rose-500/20 bg-black/60 p-8 rounded-xl">
        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #fb7185;">[Runtime Exception]</h1>
        <p style="margin-bottom: 10px; font-size: 14px; color: #e4e4e7;"><strong>Message:</strong> ${event.message}</p>
        <p style="margin-bottom: 20px; font-size: 12px; color: #a1a1aa;"><strong>Location:</strong> ${event.filename}:${event.lineno}:${event.colno}</p>
        <pre style="background: #110f1a; padding: 16px; border-radius: 8px; border: 1px solid #27272a; color: #e4e4e7; font-size: 12px; overflow-x: auto; white-space: pre-wrap;">${event.error ? event.error.stack : 'No stack trace available'}</pre>
      </div>
    `;
    document.body.appendChild(errorDiv);
  });

  window.addEventListener('unhandledrejection', (event) => {
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'fixed';
    errorDiv.style.top = '0';
    errorDiv.style.left = '0';
    errorDiv.style.width = '100vw';
    errorDiv.style.height = '100vh';
    errorDiv.style.backgroundColor = 'rgba(15, 10, 25, 0.95)';
    errorDiv.style.color = '#fb923c';
    errorDiv.style.zIndex = '999999';
    errorDiv.style.padding = '40px';
    errorDiv.style.fontFamily = 'monospace';
    errorDiv.style.overflow = 'auto';
    errorDiv.innerHTML = `
      <div style="max-w-4xl mx-auto border border-orange-500/20 bg-black/60 p-8 rounded-xl">
        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #fed7aa;">[Unhandled Promise Rejection]</h1>
        <p style="margin-bottom: 20px; font-size: 14px; color: #e4e4e7;"><strong>Reason:</strong> ${event.reason}</p>
        <pre style="background: #110f1a; padding: 16px; border-radius: 8px; border: 1px solid #27272a; color: #e4e4e7; font-size: 12px; overflow-x: auto; white-space: pre-wrap;">${event.reason && event.reason.stack ? event.reason.stack : 'No stack trace available'}</pre>
      </div>
    `;
    document.body.appendChild(errorDiv);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
