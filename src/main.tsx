import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        headings: {
          fontFamily: 'Roboto, sans-serif',
          sizes: {
            h1: { fontSize: '80px' },
            h2: { fontSize: '30px' },
          },
        },
      }}
    >
      <Notifications />
      <Router>
        <App />
      </Router>
    </MantineProvider>
  </React.StrictMode>,
);
