import React from 'react';
import Message from './Message';

const Div = styled.div`
    border: 1px solid red;
    margin: 20px;
`;

class MessageList extends React.Component {
    render() {
        console.log(this.props.messages);
        return (
            <Div>
                {this.props.messages.map((message) => {
                    return (
                        <Message
                            message={message.text}
                            sender={message.senderId}
                            time={message.createdAt}
                            key={message.id}/>
                    )
                })}
            </Div>
        )
    }
}

export default MessageList