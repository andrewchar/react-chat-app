import React from 'react';

class Message extends React.Component {
    constructor() {
        super()

        this.time = this.time.bind(this);
    }

    time(string) {
        let date = new Date(string)
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;

        return strTime;
      }

    render() {
        return (
            <div className="message-list__message">
                <img src={`https://identicon-api.herokuapp.com/${this.props.userName}/50?format=png`} alt="user avatar"/>
                <div className="message-content">
                    <div className="message-content__sender">
                        {this.props.sender} | {`${this.time(this.props.createdAt)}`}
                    </div>
                    <div className="message-content__message">{this.props.message}</div>
                </div>
            </div>
        )
    }
}

export default Message