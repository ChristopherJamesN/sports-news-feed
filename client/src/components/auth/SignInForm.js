import React, { Component } from 'react';
import { signIn } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSignInClick = () => {
    this.props.signIn(this.state.email, this.state.password)
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <input type='email'
              name='email'
              placeholder='Email'
              className="form-control"
              value={this.state.email}
              onChange={this.handleInputChange} />
           </div>
           <div className="form-group">
            <input type='password'
              name='password'
              placeholder='Password'
              className="form-control"
              value={this.state.password}
              onChange={this.handleInputChange} />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSignInClick}
              >
              Login
            </button>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: bindActionCreators(signIn, dispatch),
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
