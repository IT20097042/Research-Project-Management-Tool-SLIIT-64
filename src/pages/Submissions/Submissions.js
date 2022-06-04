import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ListItem from "@mui/material/ListItem";

import SubmissionService from "../../services/submission.service";
import { USER_TYPE } from "../../constants/constant";
import SubmissionItem from "../../components/submission-item.component";

class Submissions extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      submissions: [],
      errorMessage: null,
      open: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    if (this.props.user.user_type == USER_TYPE.SUPERVISOR) {
      SubmissionService.getAllSubmissionsForSupervisor().then(
        response => {
          if (response.data.success) {
            this.setState({
              submissions: response.data.data
            });
          } else {
            this.setState({
              submissions: [],
              errorMessage: response.data.message,
              open: true
            });

          }
        },
        error => {
          this.setState({
            submissions: [],
            errorMessage: error.response.data.message,
            open: true
          });
        }
      );
    } else {
      SubmissionService.getAllSubmissionsForPanel().then(
        response => {
          if (response.data.success) {
            this.setState({
              submissions: response.data.data
            });
          } else {
            this.setState({
              submissions: [],
              errorMessage: response.data.message,
              open: true
            });
          }
        },
        error => {
          this.setState({
            submissions: [],
            errorMessage: error.response.data.message,
            open: true
          });
        }
      );
    }
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  render() {
    const { user: currentUser } = this.props;
    const { submissions, open, errorMessage } = this.state;

    if (!currentUser) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            Submissions
          </h3>
        </header>
        <div className="list-group mt-4">
          {submissions &&
            submissions.map((item, index) => (
              <ListItem
                key={index}>
                <SubmissionItem item={item} onChange={this.fetchData}></SubmissionItem>
              </ListItem>
            ))}
            {submissions.length <= 0 && <h5>Data Not available</h5>}
        </div>
        <Snackbar open={open} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage ?? "Submissions Cannot be loaded. Something went wrong!"}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(Submissions);