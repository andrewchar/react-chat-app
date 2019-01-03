import React from 'react';

class LogIn extends React.Component {
    constructor() {
        super()
        this.state = {
            userName: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cacheUsername = this.cacheUsername.bind(this);
    }

    handleChange(e) {
        this.setState({
            userName: e.target.value
        })
    }

    handleSubmit(e) {
        if (e.keyCode === 13) {
            this.props.logIn(this.state.userName);
            this.cacheUsername(this.state.userName)
        }
    }

    cacheUsername(userName) {
        localStorage.setItem('userName', userName);
    }

    render() {
        return (
            <div className="login">
                <h1>Enter your username</h1>
                <input
                    value={this.state.userName}
                    spellCheck="false"
                    maxLength="15"
                    onChange={this.handleChange}
                    onKeyDown={this.handleSubmit}/>
            </div>
        )
    }
}

export default LogIn;