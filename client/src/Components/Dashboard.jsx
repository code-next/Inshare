import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Paper, IconButton, Button, Grid } from 'material-ui';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import GridList, { GridListTile } from 'material-ui/GridList';
import Menu, { MenuItem } from 'material-ui/Menu';
import Tabs, { Tab } from 'material-ui/Tabs';
import Zoom from 'material-ui/transitions/Zoom';
import SwipeableViews from 'react-swipeable-views';
import { Edit, Add, ArrowDropUp, MoreVert } from 'material-ui-icons';
import MenuIcon from 'material-ui-icons/Menu';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      token: null,
      tabIndex: 0,
      ip: 'http://192.168.137.138:8000/',
      sharedThumbs: [{ thumbnail_url: '' }],
      thumbnails: [{ thumbnail_url: '' }],
      anchorEl: null,
      menuOpen: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleUploadImages = this.handleUploadImages.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getThumbs = this.getThumbs.bind(this);
  }
  componentWillMount() {
    this.handleLogin();
  }
  componentDidMount() {
    this.getThumbs();
  }
  // runs when dashboad is mounted and image is uploaded
  getThumbs() {
    fetch(`${this.state.ip}gallery/get-thumbs/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: this.state.token,
      },
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ thumbnails: data });
      }).catch((err) => { console.log(err); });
  }
  getSharedThumbs() {
    fetch(`${this.state.ip}gallery/get-thumbs/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: this.state.token,
      },
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ sharedThumbs: data });
      }).catch((err) => { console.log(err); });
  }
  // checking the user is logged in or not.
  handleLogin() {
    localStorage.getItem('InshareToken') && this.setState({
      token: localStorage.getItem('InshareToken'),
      isLoggedIn: true,
    });
  }
  handleLogout() {
    localStorage.removeItem('InshareToken');
    this.setState({ isLoggedIn: false });
  }
  handleChange(event, value) {
    this.setState({ tabIndex: value });
    if (value === 1) {

    }
  }
  handleClick() {
    switch (this.state.tabIndex) {
      case 0: this.imgInput.click();
        break;
      case 1: console.log('second tab fab button');
        break;
      case 2: console.log('third tab fab button');
        break;
      default: console.log('unknown tab fab button');
    }
  }

  handleUploadImages() {
    const formData = new FormData();
    formData.append('image', this.imgInput.files[0]);
    fetch(`${this.state.ip}gallery/upload/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: this.state.token,
      },
      body: formData,
    })
      .then(res => res.json())
      .then(() => {
        console.log('Image uploaded');
      })
      .catch(err => console.log(err));

    setTimeout(() => { this.getThumbs(); }, 500);
  }
  render() {
    return (
      (this.state.isLoggedIn) ?
        <div>
          <AppBar position="static" color="accent">
            <Toolbar>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" style={{ flex: 1 }}>
                in
              </Typography>
              <IconButton
                color="inherit"
                onClick={(e) => { this.setState({ anchorEl: e.currentTarget, menuOpen: true }); }}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.menuOpen}
                onClose={() => { this.setState({ anchorEl: null, menuOpen: false }); }}
              >
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <TabComponent
            tabIndex={this.state.tabIndex}
            handleChange={this.handleChange}
          />
          <SwipeableViews
            axis="x"
            index={this.state.tabIndex}
            onChangeIndex={this.handleChange}
          >
            <GalleryTabContainer thumbnails={this.state.thumbnails} ip={this.state.ip} />
            <ShareTabContainer thumbnails={this.state.sharedThumbs} ip={this.state.ip} />
            <FriendsTabContainer />
          </SwipeableViews>
          <AddButtons
            tabIndex={this.state.tabIndex}
            click={this.handleClick}
          />
          <input
            type="file"
            multiple
            ref={(input) => { this.imgInput = input; }}
            accept=".jpg,.jpeg,.png"
            onChange={this.handleUploadImages}
            style={{ display: 'none' }}
          />
        </div>
        :
        <Redirect to="/" />
    );
  }
}
export default Dashboard;

const TabComponent = props => (
  <Paper className="gal-tab-paper">
    <Tabs
      value={props.tabIndex}
      onChange={props.handleChange}
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
);
// icon button configurations
const addButtons = [
  {
    color: 'primary',
    className: 'icon-button',
    icon: <Add />,
  },
  {
    color: 'accent',
    className: 'icon-button',
    icon: <Edit />,
  },
  {
    color: 'inherit',
    className: 'icon-button',
    icon: <ArrowDropUp />,
  },
];
const AddButtons = props => (
  <div>
    {addButtons.map((addButtons, index) => (
      <Zoom
        appear={false}
        key={addButtons.color}
        in={props.tabIndex === index}
        timeout={200}
        enterDelay={300}
        unmountOnExit
      >
        <Button
          fab
          className={addButtons.className}
          color={addButtons.color}
          onClick={props.click}
        >
          {addButtons.icon}
        </Button>
      </Zoom>
        ))}
  </div>
);

const GalleryTabContainer = props => (
  <Typography component="div" className="tab-container">
    {/* repeat this upto number of months */}
    <div className="tab-month-text">
      <span>December 2017</span>
    </div>
    <GridList cellHeight={160} cols={5}>
      {
        props.thumbnails.map(value => (
          <GridListTile key={value.thumbnail_url}>
            <img src={`${props.ip}${value.thumbnail_url}`} alt="grid img" />
          </GridListTile>
        ))
      }
    </GridList>
    {/* ends of repeating */}
  </Typography>
);

const ShareTabContainer = props => (
  <Typography component="div" className="tab-container">
    {/* repeat this upto number of months */}
    <div className="tab-month-text">
      <span>December 2017</span>
    </div>
    <GridList cellHeight={160} cols={5}>
      {
        props.thumbnails.map(value => (
          <GridListTile key={value.thumbnail_url}>
            <img src={`${props.ip}${value.thumbnail_url}`} alt="grid img" />
          </GridListTile>
        ))

      }
    </GridList>
    {/* ends of repeating */}
  </Typography>
);

const FriendsTabContainer = () => (
  <Typography component="div" className="tab-container">
    {/* repeat this upto number of months */}
    <Grid container>
      <Grid item xs={6} lg={3} >
        <Card>
          <CardMedia
            // image={}
            title="Sam"
          />
          <CardContent>
            <Typography type="headline" component="h2">
                Lizard
            </Typography>
            <Typography component="p">
                Lizards are a widespread group of squamate reptiles,
                with over 6,000 species, ranging
                across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button dense color="primary">
                Share
            </Button>
            <Button dense color="primary">
                Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
    {/* ends of repeating */}
  </Typography>
);
TabComponent.defaultProps = {
  tabIndex: 0,
  handleChange: () => {},
};
TabComponent.propTypes = {
  tabIndex: PropTypes.number,
  handleChange: PropTypes.func,
};
GalleryTabContainer.defaultProps = {
  thumbnails: [{ thumbnail_url: '' }],
  ip: '',
};
GalleryTabContainer.propTypes = {
  ip: PropTypes.string,
  thumbnails: PropTypes.arrayOf(PropTypes.object),
};
ShareTabContainer.defaultProps = {
  thumbnails: [{ thumbnail_url: '' }],
  ip: '',
};
ShareTabContainer.propTypes = {
  ip: PropTypes.string,
  thumbnails: PropTypes.arrayOf(PropTypes.object),
};
