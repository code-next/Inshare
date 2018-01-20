import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignIn from './SignIn';
import SignUp from './SignUp';
import StepperStep from './StepperStep';
import fbIcon from '../images/fbIcon.svg';
import googleIcon from '../images/googleIcon.svg';
import instaIcon from '../images/instaIcon.svg';
import './Authorization.css';


class Authorization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp: false,
      isLoggedIn: false,
      Linkdisplay: 'block',
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentWillMount() {
    this.handleLogin();
  }
  handleLogin() {
    localStorage.getItem('InshareToken') && this.setState({
      isLoggedIn: true,
    });
  }
  handleSignUp() {
    this.setState({ signUp: true, Linkdisplay: 'none' });
  }
  render() {
    return (
      (this.state.isLoggedIn) ?
        <Redirect to="/dashboard" />
        :
        <Auth
          signup={this.state.signUp}
          handleSignUp={this.handleSignUp}
          CrtLink={this.state.Linkdisplay}
          handleLogin={this.handleLogin}
        />
    );
  }
}
export default Authorization;

// main component
const Auth = props => (
  <Grid container className="masterlayer">
    <Grid item lg={4} xs={12} className="singinlayer">
      <LogoAndWriting />
      {(props.signup) ? <SignUp login={props.handleLogin} /> : <SignIn login={props.handleLogin} />}
      <FooterSignUp
        shiftSignUp={props.handleSignUp}
        LinkDisplay={props.CrtLink}
      />
    </Grid>
    <Grid item lg={8} className="imagelayer">
      <div className="foreground">
        <StepperStep />
      </div>
    </Grid>
  </Grid>
);
// LogoAndWriting component
const LogoAndWriting = () => (
  <Grid container>
    <Grid item xs={3} lg={3}>
      <div className="logo">in</div>
    </Grid>
    <Grid item xs={8} lg={6} />
    <Grid item xs={1} lg={3} />
    <Grid item xs={3} lg={3} />
    <Grid item xs={8} lg={6}>
      <div className="quote">we,<span style={{ color: '#333232' }}> share</span></div>
      <p className="quote-desc">Welcome Back, Please login <br /> to your account</p>
    </Grid>
    <Grid item xs={1} lg={3} />
  </Grid>
);
// FooterSignUp component
const FooterSignUp = props => (
  <div>
    <Grid container>
      <Grid item xs={12}>
        <div
          className="createLink"
          style={{ display: props.LinkDisplay }}
        >
          <a
            role="button"
            onKeyPress={props.shiftSignUp}
            onClick={props.shiftSignUp}
            tabIndex={0}
          >
          Create new account.
          </a>
        </div>
      </Grid>
    </Grid>
    <Grid container >
      <Grid item xs={12}>
        <div className="footerSignupLine">
          <span>OR</span>
        </div>
      </Grid>
    </Grid>
    <Grid container className="iconGroup">
      <Grid item xs={3} />
      <Grid item xs={2} ><img src={instaIcon} alt="insta icon" /></Grid>
      <Grid item xs={2} ><img src={fbIcon} alt="fb icon" /></Grid>
      <Grid item xs={2} ><img src={googleIcon} alt="google icon" /></Grid>
      <Grid item xs={3} />
    </Grid>
  </div>
);

Auth.defaultProps = {
  signup: false,
  CrtLink: 'block',
};
Auth.propTypes = {
  signup: PropTypes.bool,
  CrtLink: PropTypes.string,
  handleSignUp: PropTypes.func,
  handleLogin: PropTypes.func,
};
FooterSignUp.defaultProps = {
  LinkDisplay: 'block',
};
FooterSignUp.propTypes = {
  LinkDisplay: PropTypes.string,
  shiftSignUp: PropTypes.func,
};
