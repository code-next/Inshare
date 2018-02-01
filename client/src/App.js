import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Authorization from './Components/Authorization';
import Dashboard from './Components/Dashboard';
import NotFound from './Components/NotFound';

const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Authorization} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
