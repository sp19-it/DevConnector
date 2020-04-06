import React, { Component } from 'react';
import classnames from 'classnames';
import { registerUser } from '../../actions/authActions';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';

// Register inherits from Component(parent)
class Register extends Component {

  constructor() {
    // inherit Component Class 
    super()
    
    // Register inherits from Component Class(Component already has state object), thus this
    this.state = {
      name: '',
      email: '',
      password: '',
      password2:'',
      errors: {}
    };

    // bind this current control(this)
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    // console.log(e.target)
    // setState => change value in the state
    this.setState({ [e.target.name] : e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // registerUser is available through Register component props
    // React itself builds histroy array
    this.props.registerUser(newUser, this.props.history);
  }

  // when NEW data arrives from Redux store componentWillReceiveProps gets triggered
  // nextProps : new data (new state)
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const errors = this.state.errors;
    const { user } = this.props.auth;
    return (
    <div className="register">
      { user ? user.name : '' }
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={ this.onSubmit }>
                <div className="form-group">
                  <input 
                  type="text" 
                  className={ classnames("form-control form-control-lg", { "is-invalid": errors.name }) }
                  placeholder="Name" 
                  name="name"  
                  value={ this.state.name } // bind
                  onChange={ this.onChange } // onChange = event in the textbox, when the textbox changes, fires onChange function
                  />
                 <div className="invalid-feedback">{ errors.name }</div> 
                </div>
                <div className="form-group">
                  <input 
                  type="email" 
                  className={ classnames("form-control form-control-lg", { "is-invalid": errors.email }) }
                  placeholder="Email"
                  name="email"
                  value={ this.state.email }
                  onChange={ this.onChange } />
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                  <div className="invalid-feedback">{ errors.email }</div>
                </div>
                <div className="form-group">
                  <input 
                  type="password" 
                  className={ classnames("form-control form-control-lg", { "is-invalid": errors.password }) } 
                  placeholder="Password" 
                  name="password"
                  value={ this.state.password }
                  onChange={ this.onChange } />
                  <div className="invalid-feedback">{ errors.password }</div>
                </div>
                <div className="form-group">
                  <input 
                  type="password" 
                  className={classnames("form-control form-control-lg", { "is-invalid": errors.password2 }) } placeholder="Confirm Password" 
                  name="password2"
                  value={ this.state.password2 }
                  onChange={ this.onChange } />
                  <div className="invalid-feedback">{ errors.password2 }</div>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// to ensure that the dependencies are up and running and be available in Register component before the appliacation starts
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

// map the State from Redux store to Register component props
const mapStateToProps = state => ({
  // put state.auth into Register component property called "auth"
  auth: state.auth,
  errors: state.errors
})

const mapDispatchToProps = {
  registerUser
}

// getting state from Redux store, going to ACTION to fire dispatch type
// when Register component is connected to Redux store, registerUser automatically gets added to Register component props
export default connect(mapStateToProps, mapDispatchToProps)(Register);
