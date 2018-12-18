import React from 'react';

class SendMessageForm extends React.Component {
    constructor() {
        super()
        this.state = {
            message: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        if(e.keyCode === 13) {
            e.preventDefault();            
            this.props.sendMessage(this.state.message)

            this.setState({
                message: ''
            })
        }
      }

    render() {
        let placeholder = '';
        if (this.props.roomName !== null) {
            placeholder = `Message #${this.props.roomName}`;
        }

        return (
            <div className="send-message-form">
                <textarea 
                    onChange={this.handleChange}
                    onKeyDown={this.handleSubmit}
                    value={this.state.message}
                    disabled={this.props.roomId === null ? true : false}
                    placeholder={placeholder}
                    rows="1"/>
            </div>
        )
    }
}

export default SendMessageForm