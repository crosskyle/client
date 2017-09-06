import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../actions'

class Signup extends Component {
  onSubmit(values) {
    this.props.signupUser({ email: values.email, password: values.password })
  }

  renderField(field) {
    const { meta: {touched, error }} = field
    const className =  `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}:</label>
        <input
          {...field.input }
          type={field.type}
          className="form-control" />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="email"
          type="text"
          label="Email"
          component={this.renderField}
        />
        <Field
          name="password"
          type="password"
          label="Password"
          component={this.renderField}
        />
        <Field
          name="passwordConfirm"
          type="password"
          label="Confirm Password"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button
          action="submit"
          className="btn btn-primary">
          Sign Up
        </button>
      </form>
    )
  }
}

function validate(formProps) {
  const errors = {}

  if (!formProps.email) {
    errors.email = 'Please enter an email'
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password'
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation'
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match'
  }
  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const reduxFormSignup = reduxForm({
  form: 'signup',
  validate: validate
})(Signup)

export default connect(mapStateToProps, actions)(reduxFormSignup)