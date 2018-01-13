import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { red, indigo, blue } from 'material-ui/colors';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
    error: red,
  },
  status: {
    danger: 'orange',
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme} >
    <App />
  </MuiThemeProvider>, document.getElementById('root'),
);
