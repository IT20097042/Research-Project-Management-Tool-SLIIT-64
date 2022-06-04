import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ListItem from "@mui/material/ListItem";

import ChatMessageService from "../../services/chat-message.service";
import ChatItem from "../../components/chat-item.component";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.sentMessage = this.sentMessage.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.state = {
      open: false,
      errorMessage: null,
      message: "",
      chatMessages: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const projectId = this.props.match.params.project;

    ChatMessageService.getAllMessagesUsingGroupId(projectId).then(
      response => {
        if (response.data.success) {
          this.setState({
            chatMessages: response.data.data
          });
        } else {
          this.setState({
            chatMessages: [],
            errorMessage: response.data.message,
            open: true
          });

        }
      },
      error => {
        this.setState({
          chatMessages: [],
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

  sentMessage(message) {
    const projectId = this.props.match.params.project;

    if (!message || message == "") {
      this.setState({
        open: true,
        errorMessage: "Please type any Message to sent!"
      });
      return;
    }

    ChatMessageService.add({
      project: projectId,
      message: message
    }).then(
      response => {
        if (response.data.success) {
          this.setState({
            message: "",
          });
          this.fetchData();
        } else {
          this.setState({
            chatMessages: [],
            errorMessage: response.data.message,
            open: true
          });

        }
      },
      error => {
        this.setState({
          chatMessages: [],
          errorMessage: error.response.data.message,
          open: true
        });
      }
    );
  }

  onChangeMessage(e) {
    this.setState({
      message: e.target.value,
    });
  }

  render() {
    const { user: currentUser } = this.props;
    const { open, chatMessages, errorMessage } = this.state;

    if (!currentUser) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            Chat
          </h3>
        </header>
        <div className="list-group mt-4">
        </div>
        <div className="col-md-12">
          <TextField
            fullWidth 
            label="Type your message"
            multiline
            value={this.state.message}
            onChange={this.onChangeMessage}
            rows={2}
          />
          <Button className="mt-3" variant="contained" endIcon={<SendIcon />} 
            onClick={() => this.sentMessage(this.state.message)}>
            Send
          </Button>
          <div className="row mt-3"></div>
          {chatMessages &&
            chatMessages.map((msg, index) => (
              <ListItem
                style={msg.isLoggedUser ? { justifyContent: "right" } : {}}
                key={index}>
                <ChatItem message={msg}></ChatItem>
              </ListItem>
            ))}
        </div>
        <Snackbar open={open} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage ?? "Something went Wrong!"}
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

export default connect(mapStateToProps)(Chat);