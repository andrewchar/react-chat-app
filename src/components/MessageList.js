import React from 'react';

import Message from './Message';

class MessageList extends React.Component {
    render() {
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