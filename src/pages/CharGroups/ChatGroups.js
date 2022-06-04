import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ListItem from "@mui/material/ListItem";

import ChatMessageService from "../../services/chat-message.service";
import ChatGroupItem from "../../components/chat-group-item.component";

class ChatGroups extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      groups: [],
      errorMessage: null,
      open: false
    };
  }

  componentDidMount() {
    ChatMessageService.getAllChatGroupsForSupervisor().then(
      response => {
        if (response.data.success) {
          this.setState({
            groups: response.data.data
          });
        } else {
          this.setState({
            groups: [],
            errorMessage: response.data.message,
            open: true
          });

        }
      },
      error => {
        this.setState({
          groups: [],
          errorMessage: error.response.data.message,
          open: true
        });
      }
    );
  }

  handleClose() {
    this.setState({
      open: false,
      errorMessage: null
    });
  }

  render() {
    const { user: currentUser } = this.props;
    const { groups, open, errorMessage } = this.state;

    if (!currentUser) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            Chat Groups
          </h3>
        </header>
        <div className="list-group mt-4">
          {groups &&
            groups.map((item, index) => (
              <ListItem
                button
                onClick={() => this.props.history.push("/chat-group/" + item._id)}
                key={index}>
                <ChatGroupItem group={item}></ChatGroupItem>
              </ListItem>
            ))}
        </div>
        <Snackbar open={open} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage ?? "Chat Groups Cannot be loaded. Something went wrong!"}
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

export default connect(mapStateToProps)(ChatGroups);