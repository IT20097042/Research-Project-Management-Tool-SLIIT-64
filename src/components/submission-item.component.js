import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

import { STATUS_TYPE } from "../constants/constant";
import SubmissionService from "../services/submission.service";

class SubmissionItem extends Component {
    constructor(props) {
        super(props);
        this.getStatusString = this.getStatusString.bind(this);
        this.updateSubmission = this.updateSubmission.bind(this);
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
            return "Waiting for Approval";
        else if (value == STATUS_TYPE.ACCEPTED)
            return "Accepted";
        else
            return "Rejected";
    }

    updateSubmission(status) {
        if (!this.state.message || this.state.message == "") {
            this.setState({
                errorMessage: "Please enter a message to process the submission evaluation!",
                open: true
            });
            return;
        }

        SubmissionService.evaluateSubmission({
            submissionId: this.props.item._id,
            status: status,
            message: this.state.message
        }).then(
            response => {
                if (response.data.success) {
                    this.setState({
                        message: ""
                    });
                    this.props.onChange();
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
        const { item } = this.props;
        const { open, errorMessage } = this.state;

        return (
            <Card className="container pb-2" elevation={5}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {item.project.title}
                    </Typography>
                    <Typography variant="body1">
                        {item.project.description}
                    </Typography>
                    <Typography variant="body2">
                        Team Leader - {item.leader.full_name} <br />
                        Team Student Id - {item.leader.student_id} <br />
                        Team Email - {item.leader.email}
                    </Typography>
                    <Typography className="mt-2" variant="caption">
                        Project is {this.getStatusString(item.status)}
                    </Typography>
                    <div className="col-md-12">
                        <TextField
                            fullWidth
                            label="Type Marks"
                            multiline
                            value={this.state.message}
                            onChange={this.onChangeMessage}
                            rows={2}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small" color="success"
                        onClick={() => this.updateSubmission(STATUS_TYPE.ACCEPTED)}>
                        Approve
                    </Button>
                    <Button variant="contained" size="small" color="error"
                        onClick={() => this.updateSubmission(STATUS_TYPE.REJECTED)}>
                        Reject
                    </Button>
                    <Button variant="contained" size="small" color="info"
                        onClick={() => window.open(item.file_link, "_blank")}>
                        Download File
                    </Button>
                </CardActions>
                <Snackbar open={open} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error" sx={{ width: "100%" }}>
                        {errorMessage ?? "Submission cannot be saved!"}
                    </Alert>
                </Snackbar>
            </Card>
        );
    }
}

export default SubmissionItem;