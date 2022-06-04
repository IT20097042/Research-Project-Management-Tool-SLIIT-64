import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { USER_TYPE } from "../../constants/constant";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Input, ListItem, Button, Table} from "@mui/material";
import submissionTypesService from "../../services/submission-types.service";
import usersService from "../../services/users.service";
import { Label } from "@mui/icons-material";
import allocatePanelService from "../../services/allocate-panel.service";

class AllocatePanelMembers extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.allocatePanel = this.allocatePanel.bind(this);
        this.onChangeGroupId =this.onChangeGroupId.bind(this);
        this.onChangePanelMemberId =this.onChangePanelMemberId.bind(this);
        this.state = {
          panelMembers: [],
          errorMessage: null,
          group_id: "",
          panel_member_id : "",
          open: false
        };
    }

    componentDidMount() {
      this.fetchData();
    }

    fetchData() {
        usersService.getAllPanelMembers().then(
            response => {
                if (response.data.success) {
                    this.setState({
                      panelMembers: response.data.data
                    });
                } else {
                    this.setState({
                      panelMembers: [],
                      errorMessage: response.data.message,
                      open: true
                    });
                }
            },
            error => {
              this.setState({
                panelMembers: [],
                errorMessage: error.response.data.message,
                open: true
              });
            }
        );
    }

    allocatePanel(group_id, panel_member_id){
        if(!group_id || group_id == "" || !panel_member_id || panel_member_id == ""){
            this.state({
                open: true,
                errorMessage: "Please type any submission type"
            });
            return;
        }

        allocatePanelService.allocatePanelmember({
          group_id: group_id,
          panel_member: panel_member_id,
        }).then(
            response => {
                if(response.data.success){
                    this.setState({
                      panel_member_id: "",
                      group_id: ""
                    });
                    this.fetchData();
                } else {
                    this.setState({
                      panel_member_id: "",
                      group_id: "",
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

    onChangeGroupId(e) {
        this.setState({
          group_id: e.target.value,
        });
      }

    onChangePanelMemberId(e) {
        this.setState({
          panel_member_id: e.target.value,
        });
      }

    handleClose() {
      this.setState({
        open: false
      });
    }

  render() {
    const { user: currentUser } = this.props;
    const { panelMembers, open, errorMessage } = this.state;

    if (!currentUser) {
        return <Redirect to="/signin" />;
    }

      return (
        <div className="container">
          <header className="jumbotron">
            <h3>
              Allocate Panel Members to Student Groups
            </h3>
          </header>
          <br/>
          
          <h4>All panel members</h4>

          <Table>
            <thead>
              <tr>
                <th>Panel Member ID</th>
                <th>Name</th>
              </tr>
              
            </thead>
            <tbody>
            {
              panelMembers.map((member, index) => (
                <tr key={index}>
                  <td>{member._id}</td>
                  <td>{member.full_name}</td>
                </tr>
                  

              ))}
            </tbody>
          </Table>

            

          <div className="list-group mt-4">
              {panelMembers.length <= 0 && <h5>Data not available</h5>}
          </div>

          <h4>Add New Submission Type</h4>
          <form>
            <label>Group ID</label>
              <Input 
                placeholder="Group ID"
                variant="standard"
                value={this.state.group_id}
                onChange={this.onChangeGroupId}
              />
              <br/>
              <label>Panel Member ID</label>
              <Input 
                placeholder="Panel Member ID"
                variant="standard"
                value={this.state.panel_member_id}
                onChange={this.onChangePanelMemberId}
              />
              <br/>
                <Button variant="contained" 
                    onClick={() => this.allocatePanel(this.state.group_id, this.state.panel_member_id)}>
                    Submit
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
    const { panelMembers, message } = state.request;
    const { user } = state.auth;
    return {
        user,
        panelMembers,
        message
    };
}
export default connect(mapStateToProps)(AllocatePanelMembers);