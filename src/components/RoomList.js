import React from 'react';

class RoomList extends React.Component {
    render() {
        const orderedRooms = [...this.props.rooms].sort((a, b) => a.id > b.id)
        return (
            <div className="room-list">
                <ul>
                    {orderedRooms.map((room) => {
                        return (
                            <li key={room.id} onClick={() => this.props.subscribeToRoom(room.id)}>
                                # {room.name}
                            </li>  
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList