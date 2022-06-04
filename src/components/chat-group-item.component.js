import React, { Component } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { STATUS_TYPE } from '../constants/constant';
import RequestService from '../services/request.service';

class ChatGroupItem extends Component {
    constructor(props) {
        super(props);
        this.getStatusString = this.getStatusString.bind(this);
    }

    getStatusString(value) {
        if (value == STATUS_TYPE.WAITING_FOR_APPROVAL)
            return 'Waiting for Approval';
        else if (value == STATUS_TYPE.ON_PANEL_EVALUATION)
            return 'On Panel Evaluation';
        else if (value == STATUS_TYPE.ACCEPTED)
            return 'Accepted';
        else
            return 'Rejected';
    }

    render() {
        const { group } = this.props;

        return (
            <Card className="container pb-2" elevation={5}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {group.title}
                    </Typography>
                    <Typography variant="body1">
                        {group.description}
                    </Typography>
                    <Typography variant="body2">
                        Team Leader - {group.full_name} <br/>
                        Team Student Id - {group.student_id} <br/>
                        Team Email - {group.email}
                    </Typography>
                    <Typography className="mt-2" variant="caption">
                        Project is {this.getStatusString(group.status)}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}
export default ChatGroupItem;