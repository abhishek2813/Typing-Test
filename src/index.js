import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TextModeContextProvider } from './Context/TestModeContext';
import { ThemeContextProvider } from './Context/ThemeContest';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
    <TextModeContextProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </TextModeContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
;
