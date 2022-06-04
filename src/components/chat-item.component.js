import React, { Component } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

class ChatItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { message } = this.props;
        return (
            <Card className="my-2" style={message.isLoggedUser ? { backgroundColor: '#1976d2' } : {}} elevation={3}>
                <CardContent>
                    <Typography variant="body2">
                        {message.message}
                    </Typography>
                    <Typography variant="caption" style={{color: 'darkgrey'}}>
                        {(new Date(message.created_on)).toGMTString()}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default ChatItem;