import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Drawer, Grid, Divider, Paper, AppBar, Button, Toolbar, IconButton, Typography } from 'material-ui';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Photo, People, Share, Queue, PhotoLibrary, Search, Menu } from 'material-ui-icons';
import profileDp from '../images/dp.png';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      token: '',
      dpSrc: '',
      photoCount: 286,
      firstName: 'Tony',

    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentWillMount() {
    this.handleLogin();
  }
  // checking the user is logged in or not.
  handleLogin() {
    localStorage.getItem('InshareToken') && this.setState({
      token: JSON.parse(localStorage.getItem('InshareToken')).token,
      isLoggedIn: true,
    });
  }
  render() {
    return (
      (this.state.isLoggedIn) ?
        <div>
          <AppBar position="static" color="primary">
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu">
                <Menu />
              </IconButton>
              <Typography type="title" color="inherit">
                in
              </Typography>
            </Toolbar>
          </AppBar>
          {/* actual content goes here */}
        </div>
        :
        <Redirect to="/" />
    );
  }
}
export default Dashboard;
function importAll() {
  return require.context('../images-sample', false, /\.(png|jpe?g|svg)$/).keys()
    .map(require.context('../images-sample', false, /\.(png|jpe?g|svg)$/));
}
const Images = importAll();

