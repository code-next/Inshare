import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Drawer, Grid } from 'material-ui';
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
  }
  componentWillMount() {
    localStorage.getItem('InshareToken') && this.setState({
      token: JSON.parse(localStorage.getItem('InshareToken')).token,
      isLoggedIn: true,
    });
  }
  render() {
    return (
      (this.state.isLoggedIn) ?
        <div>
          <Drawer type="permanent">
            <div className="gal-drawer">
              <Grid container className="gal-drawer-grid" >
                <Grid item lg={12} xs={12} className="gal-whitespace" />
                <Grid item lg={3} />
                <Grid item lg={6}>
                  <div
                    className="gal-dp-image-container"
                    style={{
                      background: `url(${(this.state.dpSrc === '') ? profileDp : this.state.dpSrc}) repeat center top`,
                      backgroundSize: '100px 100px',
                    }}
                  />
                </Grid>
                <Grid item lg={3} />
                <Grid item lg={2} />
                <Grid item lg={8}>
                  <div className="gal-name">
                    <span className="first">{this.state.firstName}</span><br />
                    <span className="photo-count">{this.state.photoCount} files</span>
                  </div>
                </Grid>
                <Grid item lg={2} />
              </Grid>
            </div>
          </Drawer>
          {/* actual content goes here */}
        </div>
        :
        <Redirect to="/" />
    );
  }
}
export default Dashboard;
