import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Chatkit from '@pusher/chatkit-server';

import MessageList from './components/MessageList';
import NewRoomForm from './components/NewRoomForm';
import RoomList from './components/RoomList';
import SendMessageForm from './components/SendMessageForm';
import User from './components/User';
import CurrentRoom from './components/CurrentRoom';
import LogIn from './components/LogIn';
import TypingIndicator from './components/TypingIndicator';

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
			userName: '',
			isLoggedIn: false,
			chatConnectInit: false,
			userIsTyping: null
		}

		this.myRef = React.createRef();

		this.sendMessage = this.sendMessage.bind(this);
		this.getRooms = this.getRooms.bind(this);
		this.subscribeToRoom = this.subscribeToRoom.bind(this);
		this.createRoom = this.createRoom.bind(this);
		this.logIn = this.logIn.bind(this);
		this.typingIndicator = this.typingIndicator.bind(this);
		this.scrollToEnd = this.scrollToEnd.bind(this);
	}

    componentDidUpdate() {
		if (!this.state.chatConnectInit) {
			const chatManager = new ChatManager({
				instanceLocator: process.env.REACT_APP_INSTANCE_LOCATOR,
				userId: this.state.userName,
				tokenProvider: new TokenProvider({
					url: process.env.REACT_APP_TEST_TOKEN_PROVIDER
				})
			});

			chatManager.connect()
			.then(currentUser => {
				this.currentUser = currentUser;

				this.setState({
					chatConnectInit: true
				})

				this.getRooms();
			})
		}

		this.scrollToEnd();
	}

	logIn(userName) {
		const chatkit = new Chatkit({
			instanceLocator: process.env.REACT_APP_INSTANCE_LOCATOR,
			key: process.env.REACT_APP_SECRET_KEY
		})

	    chatkit.createUser({
			id: userName,
			name: userName,
	    })
	  	.then(() => {
			this.setState({
				userName,
				isLoggedIn: true
			})
		})
		.catch((err) => {
	  		console.log('Error creating user: ' + err);
	  	});
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
				},
				onUserStartedTyping: user => {
					this.setState({
						userIsTyping: user.name
					})
				},
				onUserStoppedTyping: user => {
					this.setState({
						userIsTyping: null					
					})
				}
			},
			messageLimit: 5
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

	typingIndicator() {
		this.currentUser.isTypingIn({
			roomId: this.state.roomId
		})
		.catch(err => {
			console.log(`Error sending typing indicator: ${err}`)
		})
	}

	scrollToEnd() {
		const node = this.myRef.current;

        node.scrollTop = node.scrollHeight;
	}
	
	render() {
		// login screen
		if (!this.state.isLoggedIn) {
			return <LogIn logIn={this.logIn}/>
		}

		return (
			<div className="App">
				<User userName={this.state.userName}/>
				<CurrentRoom roomName={this.state.roomName}/>
				<RoomList
					subscribeToRoom={this.subscribeToRoom}
					rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
				<NewRoomForm createRoom={this.createRoom}/>
				<div className="App__sub-grid" ref={this.myRef}>
					<MessageList 
						messages={this.state.messages}
						roomId={this.state.roomId}
						userName={this.state.userName}/>
					{this.state.roomId === null ? null : <TypingIndicator userIsTyping={this.state.userIsTyping}/>}
				</div>
				<SendMessageForm 
					sendMessage={this.sendMessage}
					roomId={this.state.roomId}
					roomName={this.state.roomName}
					typingIndicator={this.typingIndicator}/>
			</div>
		);
	}
}

export default App;
