import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../actions'

class Signin extends Component {
  onSubmit(values) {
    this.props.signinUser({ email: values.email, password: values.password })
  }

  renderField(field) {
    return (
      <fieldset className="form-group">
        <label>{field.label}:</label>
        <input {...field.input } type={field.type} className="form-control" />
      </fieldset>
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
        <Field name="email" type="text" label="Email" component={this.renderField}/>
        <Field name="password" type="password" label="Password" component={this.renderField}/>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const reduxFormSignin = reduxForm({
  form: 'signin',
})(Signin)

export default connect(mapStateToProps, actions)(reduxFormSignin)