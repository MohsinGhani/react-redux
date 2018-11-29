import React, { Component } from 'react';
import { auth } from './firebase/firebase';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { userAuthActions } from './store/actions/index'
import PrivateRoute from './components/common/PrivateRoute';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
// import NotFound from './components/not-found/NotFound';
import 'typeface-roboto'
import './App.css';

class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        const { email, uid, metadata } = user
        store.dispatch(userAuthActions.isLoggedInSuccess({ email, uid, metadata }))
        // User is signed in.
      } else {
        store.dispatch(userAuthActions.isLoggedInFailure())
        // No user is signed in.
      }
    });
  }


  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
