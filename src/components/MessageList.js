import React from 'react';

import Message from './Message';

class MessageList extends React.Component {
    render() {
        if (this.props.roomId === null) {
            return (
                <div>
                    <p>&#8592; Select a Channel</p>
                </div>
            )
        }
        return (
            <div>
                {this.props.messages.map((message) => {
                    return (
                        <Message
                            message={message.text}
                            sender={message.senderId}
                            time={message.createdAt}
                            key={message.id}/>
                    )
                })}
            </div>
        )
    }
}

export default MessageList