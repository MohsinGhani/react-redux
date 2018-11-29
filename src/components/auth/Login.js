import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userAuthActions } from './../../store/actions/userAction';
// import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
// import { Alert } from '../common/Alert';

import './index.css'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.error) {
      this.setState({ error: nextProps.error });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {
    return (
      <div className="login-form-container fade-in">
       {/* <Alert type="danger" isError={this.props.isError} errorMessage={this.state.error} /> */}
        <h1 className="display-4 text-center">Log In</h1>
        <p className="lead text-center">Sign in to your Secured.fyi account</p>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Email Address"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
          />

          <TextFieldGroup
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
          />

          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  isError: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.userAuth.isAuthenticated,
  isError: state.userAuth.isError,
  error: state.userAuth.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userObj) => dispatch(userAuthActions.signin(userObj))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
