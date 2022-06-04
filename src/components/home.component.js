import React, { Component } from "react";
import { connect } from "react-redux";
import { USER_TYPE } from '../constants/constant';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      isStudent: false,
      isSupervisor: false,
      isPanelMember: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        isAdmin: user.user_type == USER_TYPE.ADMIN,
        isStudent: user.user_type == USER_TYPE.STUDENT,
        isSupervisor: user.user_type == USER_TYPE.SUPERVISOR,
        isPanelMember: user.user_type == USER_TYPE.PANEL_MEMBER,
      });
    }
  }

  getDesignation() {
    if (this.state.isAdmin) {
      return 'Admin';
    } else if (this.state.isStudent) {
      return 'Student';
    } else if (this.state.isSupervisor) {
      return 'Supervisor';
    } else if (this.state.isPanelMember) {
      return 'Panel Member';
    } else {
      return 'null';
    }
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Welcome to the SLIIT Project Management Portal</h3>
        </header>
        {currentUser && <p>You will work as a {this.getDesignation()}</p>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Home);