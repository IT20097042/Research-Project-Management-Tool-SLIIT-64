import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { USER_TYPE } from "../../constants/constant";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Input, ListItem, Button } from "@mui/material";
import submissionTypesService from "../../services/submission-types.service";

class SubmissionTypes extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.addType = this.addType.bind(this);
        this.onChangeType =this.onChangeType.bind(this);
        this.state = {
          types: [],
          errorMessage: null,
          newType: "",
          open: false
        };
    }

    componentDidMount() {
      this.fetchData();
    }

    fetchData() {
        submissionTypesService.getAllSubmissionTypes().then(
            response => {
                if (response.data.success) {
                    this.setState({
                        types: response.data.data
                    });
                } else {
                    this.setState({
                      types: [],
                      errorMessage: response.data.message,
                      open: true
                    });
                }
            },
            error => {
              this.setState({
                types: [],
                errorMessage: error.response.data.message,
                open: true
              });
            }
        );
    }

    addType(type){
        if(!type || type == ""){
            this.state({
                open: true,
                errorMessage: "Please type any submission type"
            });
            return;
        }

        submissionTypesService.addSubmissionTytpe({
            type: type,
        }).then(
            response => {
                if(response.data.success){
                    this.setState({
                        newType: ""
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
        )
    }

    onChangeType(e) {
        this.setState({
          newType: e.target.value,
        });
      }

    handleClose() {
      this.setState({
        open: false
      });
    }

  

  render() {
    const { user: currentUser } = this.props;
    const { types, open, errorMessage } = this.state;

    if (!currentUser) {
        return <Redirect to="/signin" />;
    }

      return (
        <div className="container">
          <header className="jumbotron">
            <h3>
              Submission Types
            </h3>
          </header>

            {
              types.map((type, index) => (
                  <ListItem key={index}>
                      <span>{type.type}</span>
                  </ListItem>

              ))}

          <div className="list-group mt-4">
              {types.length <= 0 && <h5>Data not available</h5>}
          </div>

          <h4>Add New Submission Type</h4>
          <form>
              <Input 
                placeholder="New Submission Type"
                variant="standard"
                value={this.state.newType}
                onChange={this.onChangeType}
              />
                <Button variant="contained" 
                    onClick={() => this.addType(this.state.newType)}>
                    Add
                </Button>

          </form>
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
    const { types, message } = state.request;
    const { user } = state.auth;
    return {
        user,
        types,
        message
    };
}
export default connect(mapStateToProps)(SubmissionTypes);