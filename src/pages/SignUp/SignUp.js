import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";

import { signup } from "../../redux/actions/auth.action";
import { emailValidate, fieldRequired, passwordLengthValidate, unifiedIdLengthValidate } from "../../helpers/common.helper";
import { USER_TYPE } from "../../constants/constant";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.signupHandler = this.signupHandler.bind(this);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeUnifiedId = this.onChangeUnifiedId.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeResearchArea = this.onChangeResearchArea.bind(this);
    this.onChangeUserType = this.onChangeUserType.bind(this);
    this.state = {
      full_name: "",
      student_id: "",
      email: "",
      password: "",
      research_area: "",
      user_type: "",
      successful: false,
    };
  }

  onChangeFullName(e) {
    this.setState({
      full_name: e.target.value,
    });
  }

  onChangeUnifiedId(e) {
    this.setState({
      student_id: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeResearchArea(e) {
    this.setState({
      research_area: e.target.value,
    });
  }

  onChangeUserType(e) {
    this.setState({
      user_type: e.target.value,
    });
  }

  signupHandler(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      var data = {
        full_name: this.state.full_name,
        student_id: this.state.student_id,
        email: this.state.email,
        password: this.state.password,
        research_area: this.state.research_area && this.state.research_area != null ? +this.state.research_area : null,
        user_type: this.state.user_type && this.state.user_type != null ? +this.state.user_type : null
      };

      this.props
        .dispatch(signup(data))
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <Form
            onSubmit={this.signupHandler}
            ref={(signupForm) => {
              this.form = signupForm;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="full_name">Full Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="full_name"
                    value={this.state.full_name}
                    onChange={this.onChangeFullName}
                    validations={[fieldRequired]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="student_id">Unified Id</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="student_id"
                    value={this.state.student_id}
                    onChange={this.onChangeUnifiedId}
                    validations={[fieldRequired, unifiedIdLengthValidate]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[fieldRequired, emailValidate]}
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
                    validations={[fieldRequired, passwordLengthValidate]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user_type">User Type</label>
                  <Select
                    className="form-control"
                    name="user_type"
                    value={this.state.user_type}
                    onChange={this.onChangeUserType}
                    validations={[fieldRequired]}>
                    <option value="">Choose User Type</option>
                    <option value="2">Student</option>
                    <option value="3">Supervisor</option>
                  </Select>
                </div>
                {this.state.user_type == USER_TYPE.SUPERVISOR &&
                  <div className="form-group">
                    <label htmlFor="research_area">Research Area</label>
                    <Select
                      className="form-control"
                      name="research_area"
                      value={this.state.research_area}
                      onChange={this.onChangeResearchArea}
                      validations={[fieldRequired]}>
                      <option value="">Choose Research Area</option>
                      <option value="1">Machine Learning</option>
                      <option value="2">Advance Computing</option>
                      <option value="3">Image Processing</option>
                    </Select>
                  </div>
                }
                <div className="form-group mt-3" style={{ textAlign: "center" }}>
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}
            {message && (
              <div className="form-group mt-3">
                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
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
  const { message } = state.auth;
  return {
    message,
  };
}

export default connect(mapStateToProps)(SignUp);