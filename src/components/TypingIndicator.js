import React from 'react';

class TypingIndicator extends React.Component {
    render() {
        if (!this.props.userIsTyping) {
            return null;
        }
        
        return (
            <div className="typing-indicator">{`${this.props.userIsTyping} is typing..`}</div>
        )
    }
}

export default TypingIndicator;