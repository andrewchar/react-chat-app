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
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();            
            this.props.sendMessage(this.state.message)

            this.setState({
                message: ''
            })
        }
      }

    render() {
        return (
            <div className="send-message-form">
                <form>
                    <textarea 
                        onChange={this.handleChange}
                        onKeyDown={this.handleSubmit}
                        value={this.state.message}
                        disabled={this.props.roomId === null ? true : false}/>
                </form>
            </div>
        )
    }
}

export default SendMessageForm