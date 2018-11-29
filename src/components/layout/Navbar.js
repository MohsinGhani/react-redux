import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/index'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    auth.logOutUser().then(()=>{
      console.log("successfully Logout")
    })
    .catch(()=>{
      console.log("error in Logout")
    })
  }

  render() {

    const { isAuthenticated } = this.props;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li>
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
          
        </li>
        <li className="nav-link" onClick={this.onLogoutClick.bind(this)}>
            Logout
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto"> 
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Tourist World
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.userAuth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
