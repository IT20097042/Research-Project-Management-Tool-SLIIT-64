import React, { Component } from "react";
import { connect } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { STATUS_TYPE, USER_TYPE } from '../constants/constant';
import RequestService from '../services/request.service';

class TopicItem extends Component {
    constructor(props) {
        super(props);
        this.getStatusString = this.getStatusString.bind(this);
        this.updateRequestStatus = this.updateRequestStatus.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.state = {
            message: "",
            errorMessage: null,
            open: false
        }
    }

    getStatusString(value) {
        if (value == STATUS_TYPE.WAITING_FOR_APPROVAL)
            return 'Waiting for Approval';
        else if (value == STATUS_TYPE.ACCEPTED)
            return 'Accepted';
        else
            return 'Rejected';
    }

    updateRequestStatus(status) {
        if (!this.state.message || this.state.message == "") {
            this.setState({
                errorMessage: "Please enter a message to process the request!",
                open: true
            });
            return;
        }

        const message = this.props.user.user_type == USER_TYPE.PANEL_MEMBER ? this.state.message : null;

        RequestService.evaluateRequest({
            message: message,
            status: status,
            requestId: this.props.topic._id
        }).then(
            response => {
                if (response.data.success) {
                    this.setState({
                        message: ""
                    });
                } else {
                    this.setState({
                        errorMessage: response.data.message,
                        open: true
                    });
                }
            },
            error => {
                this.setState({
                    errorMessage: error.response.data.message,
                    open: true
                });
            }
        );
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value,
        });
    }

    render() {
        const { topic } = this.props;
        const { open, errorMessage } = this.state;

        return (
            <Card className="container pb-2" elevation={5}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {topic.project.title}
                    </Typography>
                    <Typography variant="body1">
                        {topic.project.description}
                    </Typography>
                    <Typography variant="body2">
                        Team Leader - {topic.leader.full_name} <br />
                        Team Student Id - {topic.leader.student_id} <br />
                        Team Email - {topic.leader.email}
                    </Typography>
                    <Typography className="mt-2" variant="caption">
                        Project is {this.getStatusString(topic.status)}
                    </Typography>
                    {this.props.user.user_type == USER_TYPE.PANEL_MEMBER && <div className="col-md-12">
                        <TextField
                            fullWidth
                            label="Type your Comment"
                            multiline
                            value={this.state.message}
                            onChange={this.onChangeMessage}
                            rows={2}
                        />
                        
                        

                    </div>}
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small" color='success'
                        onClick={() => this.updateRequestStatus(STATUS_TYPE.ACCEPTED)}>
                        Approve
                    </Button>
                    <Button variant="contained" size="small" color='error'
                        onClick={() => this.updateRequestStatus(STATUS_TYPE.REJECTED)}>
                        Reject
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(TopicItem);