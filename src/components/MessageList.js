import React from 'react';
import ReactDOM from 'react-dom'

import { ReactComponent as TextMessageImg } from '../images/text-message.svg';

import Message from './Message';

class MessageList extends React.Component {
    render() {
        if (this.props.roomId === null) {
            return (
                <div className="message-list flex-center">
                    <div className="no-room-selected">
                        <h1>&#8592; Select a Channel</h1>
                    </div>
                    <div></div>
                </div>
            )
        }

        if (this.props.messages.length === 0) {
            return (
                <div className="message-list flex-center">
                    <div className="message-list__empty">
                        <TextMessageImg />
                        <h2>No Messages Yet</h2>
                        <p>Be the first to post in this room!</p>
                    </div>
                    <div></div>
                </div>
            )
        }

        return (
            <div className="message-list">
                    {this.props.messages.map((message) => {
                        return (
                            <Message
                                message={message.text}
                                sender={message.senderId}
                                time={message.createdAt}
                                key={message.id}
                                createdAt={message.createdAt}
                                userName={this.props.userName}/>
                        )
                    })}
            </div>
        )
    }
}

export default MessageList