import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Paper } from 'material-ui';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      token: '',
      tabIndex: 0,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  handleChange(event, value) {
    this.setState({ tabIndex: value });
  }
  render() {
    return (
      (this.state.isLoggedIn) ?
        <div>
          <AppBar position="static" color="accent">
            <Toolbar>
              <Typography type="title" color="inherit">
                in
              </Typography>
            </Toolbar>
          </AppBar>
          <Paper className="gal-tab-paper">
            <Tabs
              value={this.state.tabIndex}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
              centered
            >
              <Tab label="Gallery" />
              <Tab label="Share" />
              <Tab label="Friends" />
            </Tabs>
          </Paper>
          <SwipeableViews
            axis="x"
            index={this.state.tabIndex}
            onChangeIndex={this.handleChange}
          >
            <div>Gallery</div>
            <div>Share</div>
            <div>Friends</div>
          </SwipeableViews>
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

