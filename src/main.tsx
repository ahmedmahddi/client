import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css'
import "./styles/styles.css";
import "./styles/custom.css";
import "./styles/about.css";
import "./styles/template.css";
import "./styles/responsive.css"
import "./styles/cta.css"
import "./styles/themify-icons.css"
import theme from 'theme/theme.ts';
import { CssBaseline, ThemeProvider } from '@mui/material';
import BreakpointsProvider from 'providers/BreakpointsProvider.tsx';
import router from 'routes/router';

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BreakpointsProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </BreakpointsProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
