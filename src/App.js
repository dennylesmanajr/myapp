import React from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { history } from './helpers';
import { getRole, getEmail } from './helpers/util';
import { alertActions } from './actions';
import { PrivateRoute } from './components/PrivateRoute';
import { LoginPage } from "./components/loginComponent";
import { HomePage } from "./containers/HomePage";
import { NewInvoicePage } from "./containers/NewInvoicePage";
import { ReportPage } from "./containers/ReportPage";
import { ViewInvoicePage } from "./containers/ViewInvoicePage";
import { globalConstants } from './constants';
// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { render } from "@testing-library/react";

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        role_code: '',
      };

      const { dispatch } = this.props;
      history.listen((location, action) => {
          // clear alert on location change
          dispatch(alertActions.clear());
      });
  }

  // componentDidUpdate(prevProps){
  //   if(this.props.authentication !== prevProps.authentication){
  //     if(this.props.authentication && this.props.authentication.user && this.props.authentication.user.roles){
  //       this.setState({
  //         role_code: this.props.authentication.user.roles.role_code,
  //       });
  //     }

  //   }

  // }
  

  render(){
    const { alert, authentication } = this.props;
    const role_code = getRole();
    const email = getEmail();
    

    
      return (
        <div className="">
            <div className="container">
                <div className="col-md-12">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router>
                        {authentication.loggedIn && <nav className="navbar navbar-expand navbar-dark bg-dark navbar-wrapper">
                          <Link to={"/home"} className="navbar-brand">
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
                            {(role_code === globalConstants.ROLE_DIRECTOR) && <li className="nav-item">
                                <Link to={"/report"} className="nav-link">
                                  Report
                                </Link>
                              </li>}
                              {/* <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                  User
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                  User
                                </Link>
                              </li> */}
                          </div>

                            <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                  <span className="navbar-brand mb-0 h1">{email}</span>
                              </li>
                              <li className="nav-item">
                                {/* <a href="/login" className="nav-link">
                                  logout
                                </a> */}
                                <Link to="/login" className="nav-link">Logout</Link>
                              </li>
                            </div>
                        </nav>}
                          <Switch>
                            <Route path="/login" component={LoginPage} />
                            <PrivateRoute exact path="/home" component={HomePage} />
                            <PrivateRoute exact path="/new_invoice" component={NewInvoicePage} />
                            <PrivateRoute path="/invoice/:id" component={ViewInvoicePage} />
                            <PrivateRoute path="/editinvoice/:invoice_id" component={NewInvoicePage} />
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
