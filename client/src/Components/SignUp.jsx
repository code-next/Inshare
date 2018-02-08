import React, { Component } from 'react';
import { Grid, TextField, Button, Modal } from 'material-ui';
import PropTypes from 'prop-types';
import { Cropper } from 'react-image-cropper';
import uploadIcon from '../images/upIcon.svg';
import profileDp from '../images/dp.png';
import './SignUp.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dp: false,
      first_name: '',
      email: '',
      password: '',
      imgSrc: '',
      openModel: false,
      profilePic: null,
    };
    this.inpuElement = null;
    this.cropElement = null;
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleModelClose = this.handleModelClose.bind(this);
    this.signUpPostRequest = this.signUpPostRequest.bind(this);
  }
  // runs when user enter the name
  handleFirstName(e) {
    this.setState({
      first_name: e.target.value,
    });
  }
  // runs when user enter email
  handleEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  // runs when user enter password
  handlePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  // runs when user click the next button
  handleNext() {
    this.setState({
      dp: true,
    });
  }
  // retrieve the path from the image-upload. And open the Modal
  handleUploadImage(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    this.setState({ profilePic: file });
    reader.onloadend = () => {
      this.setState({
        imgSrc: reader.result,
        openModel: true,
      });
    };
    reader.readAsDataURL(file);
  }
  // changing the img path to crop image path
  handleModelClose() {
    this.setState({
      openModel: false,
      imgSrc: this.cropElement.crop(),
    });
  }
  // signUp post request - runs whenever the SIGN UP button clicks.
  signUpPostRequest() {
    const formData = new FormData();
    formData.append('id', this.state.email);
    formData.append('profile_pic', this.state.profilePic);
    formData.append('first_name', this.state.first_name);
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    fetch('http://192.168.43.6:8000/auth/register/', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
      body: formData,
    }).then(res => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('InshareToken', data.token);
          this.props.login();
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      (this.state.dp) ?
      // field view of image upload
        <Grid container>
          <Grid item lg={2} xs={1} />
          <Grid item lg={7} xs={9}>
            <div
              className="dp-image-container"
              style={{
                    background: `url(${(this.state.imgSrc === '') ? profileDp : this.state.imgSrc}) repeat center top`,
                    backgroundSize: '200px 200px',
              }}
            >
              <div className="dp-hover-cover">
                <div
                  role="button"
                  onClick={() => { this.inpuElement.click(); }}
                  tabIndex="0"
                  onKeyPress={() => { this.inpuElement.click(); }}
                >
                  <img src={uploadIcon} alt="upload icon" className="upload-icon" />
                  <input
                    type="file"
                    multiple={false}
                    ref={(input) => { this.inpuElement = input; }}
                    accept=".jpg,.jpeg,.png"
                    onChange={this.handleUploadImage}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            </div>

          </Grid>
          <Grid item lg={3} xs={2} />
          <Grid item lg={5} xs={5} />
          <Grid item lg={7} xs={7}>
            <Button
              raised
              color="accent"
              className="signup-btn"
              onClick={this.signUpPostRequest}
            >
            SIGN UP
            </Button>
          </Grid>
          <Modal open={this.state.openModel} onClose={this.handleModelClose}>
            <div className="crop-modal">
              <Cropper
                src={this.state.imgSrc}
                ref={(input) => { this.cropElement = input; }}
                height={700}
                width={700}
                fixedRatio
              />
            </div>
          </Modal>
        </Grid>
        :
        // field view of firsname, email, password
        <Credentials
          changeFirstName={this.handleFirstName}
          first_name={this.state.first_name}
          changeEmail={this.handleEmail}
          email={this.state.email}
          changePassword={this.handlePassword}
          password={this.state.password}
          handleNext={this.handleNext}
        />
    );
  }
}
export default SignUp;

const Credentials = props => (
  <Grid container>
    <Grid item lg={2} xs={1} />
    <Grid item lg={7} xs={9}>
      <TextField
        label="First Name"
        placeholder="Sam"
        value={props.first_name}
        onChange={props.changeFirstName}
        className="suFirstName"
      />
    </Grid>
    <Grid item lg={3} xs={2} />
    <Grid item lg={2} xs={1} />
    <Grid item lg={7} xs={9}>
      <TextField
        label="email"
        placeholder="sam@domain.com"
        value={props.email}
        onChange={props.changeEmail}
        className="suTxt"
      />
    </Grid>
    <Grid item lg={3} xs={2} />
    <Grid item lg={2} xs={1} />
    <Grid item lg={7} xs={9}>
      <TextField
        label="password"
        type="password"
        autoComplete="current-password"
        value={props.password}
        onChange={props.changePassword}
        className="suTxt"
      />
    </Grid>
    <Grid item lg={3} xs={1} />
    <Grid item lg={6} xs={7} />
    <Grid item lg={4} xs={3}>
      <Button raised color="accent" onClick={props.handleNext} className="nxt-btn" >Next</Button>
    </Grid>
  </Grid>
);

Credentials.defaultProps = {
  first_name: '',
  email: '',
  password: '',
};
Credentials.propTypes = {
  changeFirstName: PropTypes.func,
  changeEmail: PropTypes.func,
  changePassword: PropTypes.func,
  handleNext: PropTypes.func,
  first_name: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
};
SignUp.propTypes = {
  login: PropTypes.func,
};
