import React from 'react';

class RoomList extends React.Component {
    render() {
        return (
            <div className="room-list">
                <ul>
                    {this.props.rooms.map((room) => {
                        return (
                            <li key={room.id} onClick={() => this.props.subscribeToRoom(room.id)}>
                                {/* <a 
                                    href='#'
                                    id={room.id}
                                    onClick={() => this.props.subscribeToRoom(room.id)}> */}
                                    # {room.name}
                                {/* </a> */}
                            </li>  
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList