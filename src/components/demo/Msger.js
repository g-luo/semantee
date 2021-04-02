import React, { useState } from 'react';
import axios from 'axios';
import Image from '../elements/Image';

const Msger = ({
	...props
}) => { 

	const seamanateeProfile = require('./../../assets/images/seamanatee.jpeg');
	const userProfile = require('./../../assets/images/seamanatee.jpeg');
	const [messageList, setMessages] = useState([
		{
			"is_semantee": true, 
			"text": "Hi, welcome Semantee's SQL generator. Ask any question you want to get the correct query. 😄"
		},
	]);

	const handleSetMessageList = (newMessage, isSemantee) => {
		setMessages(messageList =>
			[...messageList, 
				{
					"is_semantee": isSemantee, 
					"text": newMessage
				}
			]
		);
	} 

	const [message, setMessage] = useState("");
	const handleSetMessage = (newMessage) => {
		setMessage(message => newMessage);
	}

	const sendMessage = (e) => {
		// Prevent page reloads, which does a reset
		e.preventDefault();
		handleSetMessageList(message, false);
		handleSetMessage("");
		
		axios.get("http://localhost:5000/get", {params: {msg: message}})
		.then (
		  (response) => {
				console.log(response);
				handleSetMessageList(response.data, true);
		  }
		)
		.catch(
			(error) => {
				handleSetMessageList("Semantee threw an error. Try again.", true)
			}
		);
	}

	return (
		<div>
			<section className="msger">
				<header className="msger-header">
					<div className="msger-header-title">
						<h5> <div className="circle"></div> Semantee SQLGen </h5>
					</div>
				</header>

				<main className="msger-chat">
					{
						messageList.map(message => {
							const name = message.is_semantee ? "Semantee": "You";
							const message_class = message.is_semantee ? "msg left-msg" : "msg right-msg";
							const profile = message.is_semantee ? seamanateeProfile : userProfile;
							return (
								<div className={message_class}>
									<Image 
										className="msg-img"
										src={profile}
										height="10"
										width="10"
									/>
									<div>
										<div className="msg-info-name">{name}</div>
										<div className="msg-bubble">
											<div className="msg-info">
												<div className="msg-info-time"></div>
											</div>

											<div className="msg-text">
												{message.text}
											</div>
										</div>
									</div>
								</div>
						)})
					}
				</main>

				<form className="msger-inputarea" onSubmit={sendMessage}>
					<input type="text" className="form-input msger-input" id="textInput" placeholder="Enter your message..." value={message} onChange={(e) => handleSetMessage(e.target.value)} />
					<button type="submit" className="msger-send-btn">
						<b>Send</b>
					 </button>
				</form>
			</section>
		</div>
	)
}

export default Msger;