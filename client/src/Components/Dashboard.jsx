import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Paper, IconButton, Button, Grid, Tooltip } from 'material-ui';
import { isMobile } from 'react-device-detect';
import Card, { CardContent } from 'material-ui/Card';
import GridList, { GridListTile } from 'material-ui/GridList';
import Menu, { MenuItem } from 'material-ui/Menu';
import Tabs, { Tab } from 'material-ui/Tabs';
import Zoom from 'material-ui/transitions/Zoom';
import SwipeableViews from 'react-swipeable-views';
import { Add, ArrowDropUp, MoreVert } from 'material-ui-icons';
import MenuIcon from 'material-ui-icons/Menu';
import shortid from 'shortid';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoggedIn: false,
      token: null,
      tabIndex: 0,
      ip: '127.0.0.1',
      sharedThumbs: [{ photo: { owner: 0, thumbnail_url: '' } }],
      thumbnails: [{ thumbnail_url: '', created_at: '2018-02-07' }],
      friends: [{ user: 0, first_name: '' }],
      anchorEl: null,
      menuOpen: false,
      sortedThubnails: [[{ thumbnail_url: '', created_at: '2018-02-07' }]],
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleUploadImages = this.handleUploadImages.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getThumbs = this.getThumbs.bind(this);
    this.getSharedThumbs = this.getSharedThumbs.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.getFriends = this.getFriends.bind(this);
  }
  componentWillMount() {
    this.handleLogin();
  }
  componentDidMount() {
    this.getThumbs();
    this.getSharedThumbs();
    this.getFriends();
    this.sortByDate();
  }
  getFriends() {
    fetch(`http://${this.state.ip}:8000/share/get-friends/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: this.state.token,
      },
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ friends: data });
      })
      .catch((err) => { console.log(err); });
  }
  // runs when dashboad is mounted and image is uploaded
  getThumbs() {
    fetch(`http://${this.state.ip}:8000/gallery/get-thumbs/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: this.state.token,
      },
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ thumbnails: data });
      })
      .catch((err) => { console.log(err); });
    setTimeout(() => { this.sortByDate(); }, 100);
  }
  getSharedThumbs() {
    fetch(`http://${this.state.ip}:8000/share/get-shared-img/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: this.state.token,
      },
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ sharedThumbs: data });
        this.sortByDate();
      })
      .catch((err) => { console.log(err); });
  }
  sortByDate() {
    const groupedDates = this.state.thumbnails.reduce((list, r) => {
      const keyParts = r.created_at.split('-');
      const key = keyParts[0] + keyParts[1];

      if (typeof list[key] === 'undefined') {
        list[key] = [];
      }
      list[key].push(r);
      return list;
    }, {});

    const result = Object.keys(groupedDates)
      .sort((a, b) => Number(b) - Number(a))
      .map(key => groupedDates[key]);
    console.log(result);
    this.setState({ sortedThubnails: result });
  }
  // checking the user is logged in or not.
  handleLogin() {
    localStorage.getItem('InshareToken') && this.setState({
      token: localStorage.getItem('InshareToken'),
      isLoggedIn: true,
    });
    localStorage.getItem('InshareUsername') && this.setState({
      username: localStorage.getItem('InshareUsername'),
    });
  }
  // runs when logout button clicks
  handleLogout() {
    localStorage.removeItem('InshareToken');
    this.setState({ isLoggedIn: false });
  }
  handleChange(event, value) {
    this.setState({ tabIndex: value });
    if (value === 1) {
      this.getSharedThumbs();
    } else if (value === 0) {
      this.getThumbs();
    } else if (value === 2) {
      this.getFriends();
    }
  }
  // runs when fab button clicks
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
  // runs when the file is uploaded
  handleUploadImages() {
    const formData = new FormData();
    formData.append('image', this.imgInput.files[0]);
    fetch(`http://${this.state.ip}:8000/gallery/upload/`, {
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
    setTimeout(() => { this.getThumbs(); }, 1000);
    setTimeout(() => { this.getThumbs(); }, 1500);
  }
  render() {
    return (
      (this.state.isLoggedIn) ?
        <div>
          <AppBar position="fixed" color="accent">
            <Toolbar>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" style={{ flex: 1 }}>
                in
              </Typography>
              <Typography type="subheading" color="inherit">
                {this.state.username}
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
            <GalleryTabContainer
              thumbnails={this.state.thumbnails}
              ip={this.state.ip}
              sortedThubnails={this.state.sortedThubnails}
            />
            <ShareTabContainer thumbnails={this.state.sharedThumbs} ip={this.state.ip} />
            <FriendsTabContainer friends={this.state.friends} ip={this.state.ip} />
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

const AddButtons = props => (
  <div>
    <Tooltip title="upload">
      <Zoom
        appear={false}
        in={props.tabIndex === 0}
        timeout={200}
        enterDelay={300}
        unmountOnExit
      >
        <Button
          fab
          className="icon-button"
          color="primary"
          onClick={props.click}
        >
          <Add />
        </Button>
      </Zoom>
    </Tooltip>
    <Zoom
      appear={false}
      in={props.tabIndex === 2}
      timeout={200}
      enterDelay={300}
      unmountOnExit
    >
      <Button
        fab
        className="icon-button"
        color="accent"
        onClick={props.click}
      >
        <ArrowDropUp />
      </Button>
    </Zoom>

  </div>
);
const Months = [
  {
    count: '01',
    text: 'January',
  },
  {
    count: '02',
    text: 'February',
  },
  {
    count: '03',
    text: 'March',
  },
  {
    count: '04',
    text: 'April',
  },
  {
    count: '05',
    text: 'May',
  },
  {
    count: '06',
    text: 'June',
  },
  {
    count: '07',
    text: 'July',
  },
  {
    count: '08',
    text: 'August',
  },
  {
    count: '09',
    text: 'September',
  },
  {
    count: '10',
    text: 'Octobar',
  },
  {
    count: '11',
    text: 'November',
  },
  {
    count: '12',
    text: 'December',
  },
];

const GalleryTabContainer = props => (
  <Typography component="div" className="tab-container">
    {
      props.sortedThubnails.map((collection) => {
        const keys = collection[0].created_at.split('-');
        const imageMonth = Months.find((month) => {
            if (month.count === keys[1]) { return month; }
            return '';
          });
        return (
          <div key={shortid.generate()}>
            <div className="tab-month-text">
              <span>{`${imageMonth.text} ${keys[0]}`}</span>
            </div>
            {
              (isMobile) ?
                <GridList cellHeight={160} cols={2}>
                  {
                      collection.map(value => (
                        <GridListTile key={shortid.generate()}>
                          <img src={`http://${props.ip}:8000/${value.thumbnail_url}`} alt="grid img" />
                          {/* <img src={`${value.thumbnail_url}`} alt="grid img" /> */}
                        </GridListTile>
                      ))
                    }
                </GridList>
                :
                <GridList cellHeight={160} cols={5}>
                  {
                      collection.map(value => (
                        <GridListTile key={shortid.generate()}>
                          <img src={`http://${props.ip}:8000/${value.thumbnail_url}`} alt="grid img" />
                          {/* <img src={`${value.thumbnail_url}`} alt="grid img" /> */}
                        </GridListTile>
                      ))
                    }
                </GridList>
            }
          </div>
        );
      })
    }
  </Typography>
);

const ShareTabContainer = props => (
  <Typography component="div" className="tab-container">
    {/* repeat this upto number of months */}
    <div className="tab-month-text">
      {/* <span>December 2017</span> */}
    </div>
    {
      (isMobile) ?
        <GridList cellHeight={160} cols={2}>
          {
            props.thumbnails.map(value => (
              <GridListTile key={shortid.generate()}>
                <img src={`http://${props.ip}:8000/${value.photo.thumbnail_url}`} alt="grid img" />
                <p>{`shared by ${value.photo.user}`}</p>
              </GridListTile>
            ))

          }
        </GridList>
      :
        <GridList cellHeight={160} cols={5}>
          {
            props.thumbnails.map(value => (
              <GridListTile key={shortid.generate()}>
                <img src={`http://${props.ip}:8000/${value.photo.thumbnail_url}`} alt="grid img" />
                <p>{`shared by ${value.photo.user}`}</p>
              </GridListTile>
            ))

          }
        </GridList>

    }
    {/* ends of repeating */}
  </Typography>
);

const FriendsTabContainer = props => (
  <Typography component="div" className="tab-container">
    {/* repeat this upto number of months */}
    <Grid container>
      {
        props.friends.map(value => (
          <Grid item xs={6} lg={3} key={shortid.generate()} >
            <Card>
              <CardContent>
                <Typography type="headline" component="h2">
                  {value.first_name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          ))
      }
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
  thumbnails: [{ photo: { owner: 0, thumbnail_url: '' } }],
  ip: '',
};
ShareTabContainer.propTypes = {
  ip: PropTypes.string,
  thumbnails: PropTypes.arrayOf(PropTypes.object),
};
FriendsTabContainer.propTypes = {
  thumbnails: PropTypes.arrayOf(PropTypes.object),
};
