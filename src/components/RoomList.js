import React from 'react';

class RoomList extends React.Component {
    render() {
        return (
            <div>
                <h3>Channels</h3>
                <ul>
                    {this.props.rooms.map((room) => {
                        return (
                            <li key={room.id}>
                                # <a 
                                    href='#'
                                    id={room.id}
                                    onClick={() => this.props.subscribeToRoom(room.id)}>
                                    {room.name}
                                </a>
                            </li>  
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList