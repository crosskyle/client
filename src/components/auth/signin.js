import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../actions'

class Signin extends Component {
  onSubmit(values) {
    console.log(values.email)
    this.props.signinUser({ email: values.email, password: values.password })
  }

  renderField(field) {
    return (
      <fieldset className="form-group">
        <label>{field.label}:</label>
        <input {...field.input } type="text" className="form-control" />
      </fieldset>
    );
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="email" label="Email" component={this.renderField}/>
        <Field name="password" label="Password" component={this.renderField}/>
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

const reduxFormSignin = reduxForm({
  form: 'signin',
})(Signin)

export default connect(null, actions)(reduxFormSignin)