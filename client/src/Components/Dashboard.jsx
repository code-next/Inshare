
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Paper, IconButton, Button, Grid } from 'material-ui';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import GridList, { GridListTile } from 'material-ui/GridList';
import Menu, { MenuItem } from 'material-ui/Menu';
import Tabs, { Tab } from 'material-ui/Tabs';
import Zoom from 'material-ui/transitions/Zoom';
import SwipeableViews from 'react-swipeable-views';
import { Edit, Add, ArrowDropUp, MoreVert } from 'material-ui-icons';
import MenuIcon from 'material-ui-icons/Menu'
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      token: '',
      tabIndex: 0,
      ip:'http://10.172.174.104:8000',
      sharedImg:[],
      anchorEl:null,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleUploadImages = this.handleUploadImages.bind(this);
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
    if(value === 1){

    }
  }
  handleClick(){
    switch(this.state.tabIndex){
      case 0: this.imgInput.click();
              break;
      case 1: console.log('second tab');
              break;
      case 2: console.log('third tab');
              break;
      default: console.log('unknown tab');
    }
    
  }

  handleUploadImages(){
    fetch(this.state.ip+'/images/upload',{
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization':this.state.token,
      },
      body: JSON.stringify({
        images: this.imgInput.files,
      }),
      
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err));
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
              <Typography type="title" color="inherit" style={{flex:1}}>
                in
              </Typography>
              <IconButton 
                color="inherit"
                onClick={e=>{this.setState({anchorEl:e.currentTarget})}}  
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.anchorEl}
                onClose={()=>{this.setState({ anchorEl: null })}}
              >
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <TabComponent
            tabIndex={ this.state.tabIndex }
            handleChange={ this.handleChange }
          />
          <SwipeableViews
            axis="x"
            index={ this.state.tabIndex }
            onChangeIndex={ this.handleChange }
          >
            <GalleryTabContainer />
            <ShareTabContainer />
            <FriendsTabContainer />
          </SwipeableViews>
          <AddButtons
            tabIndex={ this.state.tabIndex }
            click={ this.handleClick }
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
function importAll() {
  return require.context('../images-sample', false, /\.(png|jpe?g|svg)$/).keys()
    .map(require.context('../images-sample', false, /\.(png|jpe?g|svg)$/));
}
const Images = importAll();
const TabComponent = props => {
  return (
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
  )
}
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
]
const AddButtons = (props) => {
  return (
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
  )
}

const GalleryTabContainer = () => {
  return (
    <Typography component="div" className="tab-container">
      {/* repeat this upto number of months */}
      <div className="tab-month-text">
        <span>December 2017</span>
      </div>
      <GridList cellHeight={160} cols={5}>
        { 
          Images.map(img=>(
            <GridListTile key={img}>
              <img src={img} alt="grid img" />
            </GridListTile>
          ))
        }
      </GridList>
      {/* ends of repeating */}
    </Typography>
  )
}

const ShareTabContainer = () => {
  return (
    <Typography component="div" className="tab-container">
      {/* repeat this upto number of months */}
      <div className="tab-month-text">
        <span>December 2017</span>
      </div>
      <GridList cellHeight={160} cols={5}>
        { 
          Images.map(img=>(
            <GridListTile key={img}>
              <img src={img} alt="grid img" />
            </GridListTile>
          ))
        }
      </GridList>
      {/* ends of repeating */}
    </Typography>
  )
}

const FriendsTabContainer = () => {
  return (
    <Typography component="div" className="tab-container">
      {/* repeat this upto number of months */}
      <Grid container>
        <Grid item xs={6} lg={3} >
          <Card>
            <CardMedia 
              image={Images[0]}
              title="Sam"
            />
            <CardContent>
              <Typography type="headline" component="h2">
                Lizard
              </Typography>
              <Typography component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
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
  )
}


