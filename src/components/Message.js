import React from 'react';

class Message extends React.Component {
    render() {
        return (
            <div>
                <div>{this.props.sender}</div>
                <div>{this.props.message}</div>
            </div>
        )
    }
}

export default Message