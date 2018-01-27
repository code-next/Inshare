
import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';



class Authorization extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signUp: false,
            isLoggedIn: false,
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
                <Redirect to="/dashboard"/>
                :
                <Auth signup={this.state.signUp}/>
        );
    }

}

export default Authorization;

// main component

const Auth = ({signup}) => (
    <Grid container className="masterlayer">
        <Grid item lg={4} xs={12} className="singinlayer">
            <LogoAndWriting/>
            {(signup) ? <SignUp/> : <SignIn/>}
            <FooterSignUp/>
        </Grid>
        <Grid item lg={8} className="imagelayer">
            <div className="foreground">
                <StepperStep/>
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
        <Grid item xs={8} lg={6}/>
        <Grid item xs={1} lg={3}/>
        <Grid item xs={3} lg={3}/>
        <Grid item xs={8} lg={6}>
            <div className="quote">we,<span style={{color: '#333232'}}> share</span></div>
            <p className="quote-desc">Welcome Back, Please login <br/> to your account</p>
        </Grid>
        <Grid item xs={1} lg={3}/>
    </Grid>
);


// function to load images
function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

// FooterSignUp component
const FooterSignUp = () => (
    <div>
        <Grid container>
            <Grid item xs={12}>
                <div className="createLink"><a>Create new account.</a></div>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={12}>
                <div className="footerSignupLine">
                    <span>OR</span>
                </div>
            </Grid>
        </Grid>
        <Grid container className="iconGroup">
            <Grid item xs={3}/>
            <Grid item xs={2}><img src={images[2]} alt="insta icon"/></Grid>
            <Grid item xs={2}><img src={images[0]} alt="fb icon"/></Grid>
            <Grid item xs={2}><img src={images[1]} alt="google icon"/></Grid>
            <Grid item xs={3}/>
        </Grid>
    </div>



