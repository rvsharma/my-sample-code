import React from 'react';
import { Router } from 'react-router';
import { history } from './components/shared/helperMethods/HelperMethod';
import Routes from './components/routing/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/main.scss';

class App extends React.PureComponent<{}, {}> {
  render(): React.ReactNode {
    return (
      <Router history={history}>
        <Routes />
      </Router>
    );
  }
}
export default App;
