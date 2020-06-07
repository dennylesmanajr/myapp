import React from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { history } from './helpers';
import { alertActions } from './actions';
import { PrivateRoute } from './components/PrivateRoute';
import { LoginPage } from "./components/loginComponent";
import { HomePage } from "./containers/HomePage";
// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { render } from "@testing-library/react";

class App extends React.Component {

  constructor(props) {
      super(props);

      const { dispatch } = this.props;
      history.listen((location, action) => {
          // clear alert on location change
          dispatch(alertActions.clear());
      });
  }
  

  render(){
    const { alert } = this.props;
      return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-sm-8 col-sm-offset-2">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router>
                        {/* <div>
                            <Route path="/login" component={LoginPage} />
                            <PrivateRoute exact path="/" component={HomePage} />
                            
                        </div> */}
                          <Switch>
                            <Route path="/login" component={LoginPage} />
                            <PrivateRoute exact path="/" component={HomePage} />
                          </Switch>
                    </Router>
                </div>
            </div>
        </div>
      );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(App);

export default connectedApp; 
