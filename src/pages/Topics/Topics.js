import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ListItem from "@mui/material/ListItem";

import RequestService from "../../services/request.service";
import TopicItem from "../../components/topic-item.component";
import { USER_TYPE } from "../../constants/constant";

class Topics extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      topics: [],
      errorMessage: null,
      open: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    if (this.props.user.user_type == USER_TYPE.SUPERVISOR) {
      RequestService.getAllTopicsForSupervisor().then(
        response => {
          if (response.data.success) {
            this.setState({
              topics: response.data.data
            });
          } else {
            this.setState({
              topics: [],
              errorMessage: response.data.message,
              open: true
            });
          }
        },
        error => {
          this.setState({
            topics: [],
            errorMessage: error.response.data.message,
            open: true
          });
        }
      );
    } else {
      RequestService.getAllTopicsForPanel().then(
        response => {
          if (response.data.success) {
            this.setState({
              topics: response.data.data
            });
          } else {
            this.setState({
              topics: [],
              errorMessage: response.data.message,
              open: true
            });
          }
        },
        error => {
          this.setState({
            topics: [],
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
    const { topics, open, errorMessage } = this.state;

    if (!currentUser) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            Requests
          </h3>
        </header>
        <div className="list-group mt-4">
          {topics &&
            topics.map((topic, index) => (
              <ListItem
                key={index}>
                <TopicItem topic={topic}></TopicItem>
              </ListItem>
            ))}
            {topics.length <= 0 && <h5>Data not available</h5>}
        </div>
        <Snackbar open={open} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage ?? "Requests Cannot be loaded. Something went wrong!"}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { topics, message } = state.request;
  const { user } = state.auth;
  return {
    user,
    topics,
    message
  };
}
export default connect(mapStateToProps)(Topics);