import React, { Component } from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, Button } from 'material-ui';
import { Redirect } from 'react-router-dom';
import './SignIn.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: false,
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }
  componentWillMount() {

  }
  handleSignIn() {
    fetch('http://localhost:8000/auth/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then(res => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('InshareToken', JSON.stringify(data));
          this.setState({ login: true });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (

      (this.state.login) ? <Redirect to="/dashboard" /> :
      <div>
        <Grid container >
          <Grid item lg={2} xs={1} />
          <Grid item lg={7} xs={9}>
            <TextField
              label="email"
              placeholder="sam@gmail.com"
              className="email"
              value={this.state.username}
              onChange={
                (e) => { this.setState({ username: e.target.value }); }
                }
            />
            <TextField
              label="password"
              className="password"
              type="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={
                (e) => { this.setState({ password: e.target.value }); }
                }
            />
          </Grid>
          <Grid item lg={3} xs={2} />
        </Grid>
        <Grid container>
          <Grid item lg={2} xs={1} />
          <Grid item lg={5} xs={6}>
            <FormControlLabel
              className="check"
              control={<Checkbox value="remeber" />}
              label="Remember me"
            />
          </Grid>
          <Grid item lg={4} xs={4}>
            <div className="forgot"><a>forgot password?</a></div>
          </Grid>
          <Grid item lg={1} xs={1} />
        </Grid>
        <Grid container>
          <Grid item lg={6} xs={6} />
          <Grid item lg={6} xs={6}>
            <Button raised color="accent" onClick={this.handleSignIn} className="log-btn" >SIGN IN</Button>
          </Grid>
        </Grid>
      </div>

    );
  }
}
export default SignIn;

