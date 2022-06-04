import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { USER_TYPE } from "../../constants/constant";
import usersService from "../../services/users.service";
import { Button, Input, MenuItem, Select } from "@mui/material";

class Users extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.editUserDetails = this.editUserDetails.bind(this);
    this.state = {
      user_id: "",
      full_name: "",
      user_type: 1,
      errorMessage: null,
      open: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
      var url_string = window.location.href;
      var url = new URL(url_string);
      
      this.setState({
          full_name: url.searchParams.get('full_name'),
          user_type: url.searchParams.get('user_type'),
          user_id: url.searchParams.get('user_id')
      });
  }

  editUserDetails(){
      usersService.editUser({"user_id": this.state.user_id, "full_name": this.state.full_name, "user_type": this.state.user_type});
      this.props.history.push('/');
      this.props.history.push('/users');
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  onChangeName(e){
      this.setState({
          full_name: e.target.value
      })
  }

  onChangeType(e){
    this.setState({
        user_type: e.target.value
    })
}

  getDesignation(id) {
    if (id == USER_TYPE.ADMIN) {
      return 'Admin';
    } else if (id == USER_TYPE.STUDENT) {
      return 'Student';
    } else if (id == USER_TYPE.SUPERVISOR) {
      return 'Supervisor';
    } else if (id == USER_TYPE.PANEL_MEMBER) {
      return 'Panel Member';
    } else {
      return 'null';
    }
  }

  render() {
    const { user: currentUser } = this.props;
    const { open, errorMessage } = this.state;

    if (!currentUser) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            Edit Users
          </h3>
        </header>
        
        <div className="list-group mt-4">
          <h6>Full Name</h6>
          <Input 
            placeholder="Full Name"
            value={this.state.full_name}
            onChange={this.onChangeName}
            />
          <br/>
          <h6>User Type</h6>
          <Select 
            value={this.state.user_type}
            onChange={this.onChangeType}
            >
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Student</MenuItem>
              <MenuItem value={3}>Supervisor</MenuItem>
              <MenuItem value={4}>Panel Member</MenuItem>
          </Select>

          <br/>
          <Button onClick={this.editUserDetails}>Submit</Button>
            
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { message } = state.request;
  const { user } = state.auth;
  return {
    user,
    
    message
  };
}
export default connect(mapStateToProps)(Users);