import React, { Component } from 'react';
import { Step, Stepper, StepButton, Grid } from 'material-ui';


class StepperStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      indexText: 'Select campaign settings...',
    };
  }
  render() {
    const { stepIndex } = this.state;
    return (
      <Grid container className="imgLayerContainer">
        <Grid item xs={12} className="item whitespace" />
        <Grid item xs={12} className="item" >
          <Grid container className="imgLayerContainer" >
            <Grid item xs={2} className="item" />
            <Grid item xs={8} className="item" ><p className="front-heading">{this.state.indexText}</p></Grid>
            <Grid item xs={2} className="item" />
            <Grid item xs={2} className="item" />
            <Grid item xs={10} className="item">
              <p className="front-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="item">
          <Stepper
            nonLinear
            activeStep={stepIndex}
            connector={null}
            style={{
              placeContent: 'normal normal',
              marginLeft: '45%',
              backgroundColor: 'rgba(57,73,171,0)',
            }}
          >
            <Step>
              <StepButton onClick={() => this.setState({
                stepIndex: 0,
                indexText: 'Select campaign settings...',
                })}
              />
            </Step>
            <Step>
              <StepButton
                onClick={() => this.setState({
                stepIndex: 1,
                indexText: 'Share your moments with us !',
                })}
              />
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({
                stepIndex: 2,
                indexText: 'This is the bit I really care about!',
                })}
              />
            </Step>
          </Stepper>
        </Grid>
      </Grid>
    );
  }
}
export default StepperStep;
