import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { USER_TYPE } from "../../constants/constant";
import usersService from "../../services/users.service";
import { Table, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { Link } from "react-router-dom";

class Users extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      users: [],
      errorMessage: null,
      open: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
      usersService.getAllusers().then(
        response => {
          if (response.data.success) {
            this.setState({
              users: response.data.data
            });
          } else {
            this.setState({
              users: [],
              errorMessage: response.data.message,
              open: true
            });
          }
        },
        error => {
          this.setState({
            users: [],
            errorMessage: error.response.data.message,
            open: true
          });
        }
      );
    
  }

  deleteUser(id){
    usersService.deleteUser(id).then(
      response => {
        if(response.data.success){
          this.fetchData();
        }else{
          this.setState({
            errorMessage: error.response.data.message,
            open: true
          });
        }
      }
    )
  }

  handleClose() {
    this.setState({
      open: false
    });
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
    const { users, open, errorMessage } = this.state;

    if (!currentUser) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            Users
          </h3>
        </header>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <tbody>
          {
            users.map((user, index) => (
              
                <TableRow  key={index}>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{this.getDesignation(user.user_type)}</TableCell>
                  {user.user_type != 1 && <TableCell><Link to={"/users/edit?user_id="+user._id+"&full_name="+user.full_name+"&user_type="+user.user_type}>Edit</Link><br/><Button onClick={()=>this.deleteUser(user._id)}>Delete</Button></TableCell>}
                  {user.user_type == 1 && <TableCell>Can't change Admin</TableCell>}
                  
                </TableRow>
            ))}
          </tbody>
        </Table>
        <div className="list-group mt-4">
          
            {users.length <= 0 && <h5>Data not available</h5>}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { users, message } = state.request;
  const { user } = state.auth;
  return {
    user,
    users,
    message
  };
}
export default connect(mapStateToProps)(Users);