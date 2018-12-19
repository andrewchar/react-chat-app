import React from 'react';

class User extends React.Component {
    render() {
        return (
            <div className="user">
                <img src={`https://identicon-api.herokuapp.com/${this.props.userName}/50?format=png`} alt="user avatar"/>
                <span>{this.props.userName}</span>
            </div>
        )
    }
}

export default User;