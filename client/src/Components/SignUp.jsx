import React, { Component } from 'react';
import {Grid, TextField, Button } from 'material-ui';
import './SignUp.css'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dp:false,
      first_name:'',
      email:'',
      password:'',
    };
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
  handleFirstName(e){this.setState({first_name:e.target.value});}
  handleEmail(e){this.setState({email:e.target.value});}
  handlePassword(e){this.setState({password:e.target.value});}
  handleNext(e){this.setState({dp:true});}
  render() {
    return (
      (this.state.dp)?
      <DpUpload />
      :
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

const Credentials = (props) => {
  return (
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
};

const DpUpload = () => {
  return(
    <Grid container>

    </Grid>
  );
}