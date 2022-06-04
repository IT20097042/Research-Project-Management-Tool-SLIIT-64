import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";

import { fieldRequired } from "../../helpers/common.helper";
import { signin } from "../../redux/actions/auth.action";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.signinHandler = this.signinHandler.bind(this);
    this.onChangeUid = this.onChangeUid.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      student_id: "",
      password: "",
      loading: false
    };
  }

  onChangeUid(e) {
    this.setState({
      student_id: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  signinHandler(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(signin(this.state.student_id, this.state.password))
        .then(() => {
          history.push("/home");
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { isLoggedIn, message } = this.props;
    
    if (isLoggedIn) {
      return <Redirect to="/home" />;
    }

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <Form
            onSubmit={this.signinHandler}
            ref={(signinForm) => {
              this.form = signinForm;
            }}
          >
            <div className="form-group">
              <label htmlFor="uid">Unified Id</label>
              <Input
                type="text"
                className="form-control"
                name="uid"
                value={this.state.student_id}
                onChange={this.onChangeUid}
                validations={[fieldRequired]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[fieldRequired]}
              />
            </div>
            <div className="form-group mt-3" style={{ textAlign: "center" }}>
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Sign in</span>
              </button>
            </div>
            {message && (
              <div className="form-group mt-3">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(chk) => {
                this.checkBtn = chk;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn, message } = state.auth;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(SignIn);
