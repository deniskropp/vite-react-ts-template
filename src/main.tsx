import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import '@/assets/style/index.scss';
import App from './App';
import './i18n';

// import {ThemeProvider} from '@mui/material';
// import theme from '@/theme/index';

ReactDOM.render(
  <React.StrictMode>
    {/* If you need to customize a theme, */}
    {/* See: https://mui.com/zh/customization/default-theme/ */}
    {/*<ThemeProvider theme={theme.v1.light}>*/}
      <App/>
    {/*</ThemeProvider>*/}
  </React.StrictMode>,
  document.getElementById('root'),
);
