import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

import MessageList from './components/MessageList';
import NewRoomForm from './components/NewRoomForm';
import RoomList from './components/RoomList';
import SendMessageForm from './components/SendMessageForm';
import User from './components/User';
import CurrentRoom from './components/CurrentRoom';

import './styles/style.scss';

class App extends Component {
	constructor() {
		super();

		this.state = {
			roomId: null,
			messages: [],
			joinableRooms: [],
			joinedRooms: [],
			roomName: null,
			userName: 'andrew'
		}

		this.sendMessage = this.sendMessage.bind(this);
		this.getRooms = this.getRooms.bind(this);
		this.subscribeToRoom = this.subscribeToRoom.bind(this);
		this.createRoom = this.createRoom.bind(this);
	}

    componentDidMount() {
		const chatManager = new ChatManager({
			instanceLocator: 'v1:us1:fb26ac6a-c4a4-43c6-afb1-3f8a573b1029',
			userId: this.state.userName, // todo: programatically update this
			tokenProvider: new TokenProvider({
				url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/fb26ac6a-c4a4-43c6-afb1-3f8a573b1029/token'
			})
		});

		chatManager.connect()
		.then(currentUser => {
			this.currentUser = currentUser;
			this.getRooms();
		})
	}

	getRooms() {
		this.currentUser.getJoinableRooms()
		.then(joinableRooms => {
			this.setState({
				joinedRooms: this.currentUser.rooms,
				joinableRooms
			})
		})
		.catch(err => {
			console.log(`Error fetching joinableRooms: ${err}`)
		})
	}

	subscribeToRoom(roomId) {
		this.setState({ messages: [] })
		this.currentUser.subscribeToRoom({
			roomId,
			hooks: {
			  onMessage: message => {
				this.setState({
					messages: [...this.state.messages, message]
				})
			  }
			}
		})
		.then(room => {
			this.setState({
				roomId: room.id,
				roomName: room.name
			})
		})
		this.getRooms();
	}

	createRoom(name) {
		this.currentUser.createRoom({
			name,
		}).then(room => {
			this.subscribeToRoom(room.id);
		})
		.catch(err => {
			console.log(`Error creating room ${err}`)
		})
	}

	sendMessage(text) {
		this.currentUser.sendMessage({
			text,
			roomId: this.state.roomId
		})
		.catch(err => {
			console.log(`Error adding message: ${err}`)
		})
	}

	render() {
		return (
			<div className="App">
				<User userName={this.state.userName}/>
				<CurrentRoom  roomName={this.state.roomName}/>
				<RoomList
					subscribeToRoom={this.subscribeToRoom}
					rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
				<NewRoomForm createRoom={this.createRoom}/>
				<MessageList 
					messages={this.state.messages}
					roomId={this.state.roomId}
					userName={this.state.userName}/>
				<SendMessageForm 
					sendMessage={this.sendMessage}
					roomId={this.state.roomId}
					roomName={this.state.roomName}/>
			</div>
		);
	}
}

export default App;
