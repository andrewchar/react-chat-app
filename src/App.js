import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

import Message from './components/Message';
import MessageList from './components/MessageList';
import NewRoomForm from './components/NewRoomForm';
import RoomList from './components/RoomList';
import SendMessageForm from './components/SendMessageForm';

import './styles/style.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			roomId: null,
			messages: [],
			joinableRooms: [],
			joinedRooms: []
		}

		this.sendMessage = this.sendMessage.bind(this);
		this.getRooms = this.getRooms.bind(this);
		this.subscribeToRoom = this.subscribeToRoom.bind(this);
		this.createRoom = this.createRoom.bind(this);
	}

    componentDidMount() {
		const chatManager = new ChatManager({
			instanceLocator: 'v1:us1:fb26ac6a-c4a4-43c6-afb1-3f8a573b1029',
			userId: 'andrew', // todo: programatically update this
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
				roomId: room.id
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
				<RoomList
					subscribeToRoom={this.subscribeToRoom}
					rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
				<MessageList messages={this.state.messages}/>
				<NewRoomForm createRoom={this.createRoom}/>
				<SendMessageForm sendMessage={this.sendMessage}/>
			</div>
		);
	}
}

export default App;
