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
    };
    this.inpuElement = null;
    this.cropElement = null;
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleModelClose = this.handleModelClose.bind(this);
  }
  handleFirstName(e) { this.setState({ first_name: e.target.value }); }// setting firstname value
  handleEmail(e) { this.setState({ email: e.target.value }); }// setting value of email
  handlePassword(e) { this.setState({ password: e.target.value }); }// setting value of password
  handleNext() { this.setState({ dp: true }); }// directing the view.(handling Next button)
  // retrieve the path from the image-upload. And open the Modal
  handleUploadImage(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imgSrc: reader.result,
        openModel: true,
      });
    };
    reader.readAsDataURL(file);
  }
  // changing the crop image path
  handleModelClose() {
    this.setState({
      openModel: false,
      imgSrc: this.cropElement.crop(),
    });
  }
  render() {
    return (
      (this.state.dp) ?
      // view of image upload
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
                <a onClick={() => { this.inpuElement.click(); }}>
                  <img src={uploadIcon} alt="uplad icon" className="upload-icon" />
                  <input
                    type="file"
                    multiple={false}
                    ref={(input) => { this.inpuElement = input; }}
                    accept=".jpg,.jpeg,.png"
                    onChange={this.handleUploadImage}
                    style={{ display: 'none' }}
                  />
                </a>
              </div>
            </div>

          </Grid>
          <Grid item lg={3} xs={2} />
          <Grid item lg={5} xs={5} />
          <Grid item lg={7} xs={7}>
            <Button raised color="accent" className="signup-btn">SIGN UP</Button>
          </Grid>
          <Modal open={this.state.openModel} onClose={this.handleModelClose}>
            <div className="crop-modal">
              <Cropper
                src={this.state.imgSrc}
                ref={(input) => { this.cropElement = input; }}
                height={500}
                width={500}
                fixedRatio
              />
            </div>
          </Modal>
        </Grid>
        :
        // view of firsname, email, password
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
