import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Drawer, Grid, Divider, Paper, FormControl } from 'material-ui';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Input, { InputAdornment } from 'material-ui/Input';
import GridList, { GridListTile } from 'material-ui/GridList';
import { Photo, People, Share, Queue, PhotoLibrary, Search } from 'material-ui-icons';
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
          <GalleryDrawer
            dpSrc={this.state.dpSrc}
            firstName={this.state.firstName}
            photoCount={this.state.photoCount}
          />
          {/* actual content goes here */}
          <GallerySearch />
          <GalleryPhotos />
          <div style={{ height: '1000px' }} />
        </div>
        :
        <Redirect to="/" />
    );
  }
}
export default Dashboard;
function importAll() {
  return require.context('../images-sample', false, /\.(png|jpe?g|svg)$/).keys().map(
    require.context('../images-sample', false, /\.(png|jpe?g|svg)$/),
  );
}
const Images = importAll();
const GallerySearch = () => (
  <Grid container>
    <Grid item lg={3} />
    <Grid item lg={8}>
      <Paper className="gal-paper" style={{ paddingBottom: '5px!important', paddingTop: '15px' }}>
        <Grid container >
          <Grid item lg={1} />
          <Grid item lg={10}>
            <FormControl fullWidth>
              <Input
                startAdornment={<InputAdornment position="start"><Search /></InputAdornment>}
                placeholder="Search"
              />
            </FormControl>
          </Grid>
          <Grid item lg={1} />
        </Grid>
      </Paper>
    </Grid>
    <Grid item lg={1} />
  </Grid>
);
const GalleryPhotos = () => (
  <Grid container className="gal-photos">
    <Grid item lg={2} />
    <Grid item lg={10}>
      <Paper className="gal-paper">
        <div className="gal-ph-collec-head">December 2016<span>(8photos)</span></div>
        <GridList cellHeight={200} spacing={2} cols={4} >
          { Images.map(elem => (
            <GridListTile key={elem} cols={1} rows={1}>
              <img src={elem} alt="just img" />
            </GridListTile>
            ))
          }
        </GridList>
      </Paper>
      <Paper className="gal-paper">
        <div className="gal-ph-collec-head">November 2016<span>(8photos)</span></div>
        <GridList cellHeight={200} spacing={2} cols={4} >
          { Images.map(elem => (
            <GridListTile key={elem} cols={1} rows={1}>
              <img src={elem} alt="just img" />
            </GridListTile>
            ))
          }
        </GridList>
      </Paper>
    </Grid>
  </Grid>
);

const GalleryDrawer = props => (
  <Drawer type="permanent">
    <div className="gal-drawer">
      <Grid container className="gal-drawer-grid" >
        <Grid item lg={12} xs={12} className="gal-whitespace" />
        <Grid item lg={3} />
        <Grid item lg={6}>
          <div
            className="gal-dp-image-container"
            style={{
              background: `url(${(props.dpSrc === '') ? profileDp : props.dpSrc}) repeat center top`,
              backgroundSize: '100px 100px',
            }}
          />
        </Grid>
        <Grid item lg={3} />
        <Grid item lg={2} />
        <Grid item lg={8}>
          <div className="gal-name">
            <span className="first">{props.firstName}</span><br />
            <span className="photo-count">{props.photoCount} files</span>
          </div>
        </Grid>
        <Grid item lg={2} />
        <Grid item lg={12} xs={12} className="gal-whitespace" />
      </Grid>
      <Divider className="gal-divider" />
      <Grid container className="gal-drawer-grid">
        <Grid item lg={12} xs={12} />
        <Grid item lg={12}>
          <div className="gal-head-names">
            CATEGORIES
          </div>
        </Grid>
        <Grid item lg={12}>
          <List className="gal-drawer-list">
            <ListItem button >
              <ListItemIcon>
                <Photo />
              </ListItemIcon>
              <ListItemText primary="Photos" />
            </ListItem>
            <ListItem button >
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItem>
            <ListItem button >
              <ListItemIcon>
                <Share />
              </ListItemIcon>
              <ListItemText primary="Shares" />
            </ListItem>
          </List>
        </Grid>
        <Grid item lg={9}>
          <div className="gal-head-names">
            ALBUMS
          </div>
        </Grid>
        <Grid item lg={3}>
          <Queue color="primary" style={{ marginTop: '-10%' }} />
        </Grid>
        <Grid item lg={12}>
          <List className="gal-drawer-list">
            {/* albums start */}
            <ListItem button>
              <ListItemIcon>
                <PhotoLibrary />
              </ListItemIcon>
              <ListItemText primary="Summer 2017" secondary="16 photos" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PhotoLibrary />
              </ListItemIcon>
              <ListItemText primary="Summer 2017" secondary="16 photos" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PhotoLibrary />
              </ListItemIcon>
              <ListItemText primary="Summer 2017" secondary="16 photos" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PhotoLibrary />
              </ListItemIcon>
              <ListItemText primary="Summer 2017" secondary="16 photos" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PhotoLibrary />
              </ListItemIcon>
              <ListItemText primary="Summer 2017" secondary="16 photos" />
            </ListItem>
            {/* albums end */}
          </List>
        </Grid>
      </Grid>
    </div>
  </Drawer>
);

GalleryDrawer.defaultProps = {
  dpSrc: '',
  firstName: '',
  photoCount: 0,
};
GalleryDrawer.propTypes = {
  dpSrc: PropTypes.string,
  firstName: PropTypes.string,
  photoCount: PropTypes.number,
};
