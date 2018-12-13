import React from 'react';

class RoomList extends React.Component {
    render() {
        return (
            <div>
                <h3>Rooms</h3>
                <ul>
                    {this.props.rooms.map((el, i) => {
                        return <li key={i}>{el.name}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList