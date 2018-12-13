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
			messages: [],
			joinableRooms: [],
			joinedRooms: []
		}
	}

    componentDidMount() {
		const chatManager = new ChatManager({
			instanceLocator: 'v1:us1:fb26ac6a-c4a4-43c6-afb1-3f8a573b1029',
			userId: 'andrew',
			tokenProvider: new TokenProvider({
				url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/fb26ac6a-c4a4-43c6-afb1-3f8a573b1029/token'
			})
		});

		chatManager.connect()
		.then(currentUser => {
			this.currentUser = currentUser;

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

			this.currentUser.fetchMessages({
				roomId: '19378463',
				// initialId: 42,
				// direction: 'older',
			})
			.then(messages => {
				this.setState({
					messages
				})
			})
			.catch(err => {
				console.log(`Error fetching messages: ${err}`)
			})
		})
			
	}

	render() {
		return (
			<div className="App">
				<RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
				<MessageList messages={this.state.messages}/>
				<NewRoomForm />
				<SendMessageForm />
			</div>
		);
	}
}

export default App;
