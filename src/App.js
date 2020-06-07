import React from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { history } from './helpers';
import { alertActions } from './actions';
import { PrivateRoute } from './components/PrivateRoute';
import { LoginPage } from "./components/loginComponent";
import { HomePage } from "./containers/HomePage";
import { NewInvoicePage } from "./containers/NewInvoicePage";
import { ReportPage } from "./containers/ReportPage";
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
    const { alert, authentication } = this.props;
    console.log('authentication: ', authentication);

    
      return (
        <div className="">
            <div className="container">
                <div className="col-md-12">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router>
                        {authentication.loggedIn && <nav className="navbar navbar-expand navbar-dark bg-dark navbar-wrapper">
                          <Link to={"/"} className="navbar-brand">
                            My App
                          </Link>
                          <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                              <Link to={"/home"} className="nav-link">
                                Home
                              </Link>
                            </li>

                            {/* {showModeratorBoard && (
                              <li className="nav-item">
                                <Link to={"/mod"} className="nav-link">
                                  Moderator Board
                                </Link>
                              </li>
                            )}

                            {showAdminBoard && (
                              <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                  Admin Board
                                </Link>
                              </li>
                            )}

                            {currentUser && (
                              <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                  User
                                </Link>
                              </li>
                            )} */}
                            <li className="nav-item">
                                <Link to={"/report"} className="nav-link">
                                  Report
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                  User
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                  User
                                </Link>
                              </li>
                          </div>

                            <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                  <span className="navbar-brand mb-0 h1">{authentication.user.email}</span>
                              </li>
                              <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                  LogOut
                                </a>
                              </li>
                            </div>
                        </nav>}
                          <Switch>
                            <Route path="/login" component={LoginPage} />
                            <PrivateRoute exact path="/home" component={HomePage} />
                            <PrivateRoute exact path="/new_invoice" component={NewInvoicePage} />
                            <PrivateRoute exact path="/report" component={ReportPage} />
                          </Switch>
                    </Router>
                </div>
            </div>
        </div>
      );
  }
}

function mapStateToProps(state) {
  const { alert, authentication } = state;
  return {
      alert,
      authentication,
  };
}

const connectedApp = connect(mapStateToProps)(App);

export default connectedApp; 
