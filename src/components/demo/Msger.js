import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from '../elements/Image';
import MsgTable from './MsgTable';
import { Button } from 'react-bootstrap';

const Msger = ({
	isDisabled,
	initInfo,
	...props
}) => {
	const seamanateeProfile = require('./../../assets/images/seamanatee.png');
	const userProfile = require('./../../assets/images/user.png');

	// useEffect is required to update based on props
	useEffect(() => {
		if (initInfo.options) {
			handleSetMessageList("Select a query", false, null, null, initInfo.options)
	  	}
	}, [initInfo.options])

	const [messageList, setMessages] = useState([
		{
			"is_semantee": true, 
			"text": "Hi, welcome Semantee's scripted SQL generator. Select a query to get started. 😄",
			"table": null,
			"info": null,
			"options": null
		},
	]);

	const handleSetMessageList = (newMessage, isSemantee, table, info, newOptions) => {
		setMessages(messageList =>
			[
				{
					"is_semantee": isSemantee, 
					"text": newMessage,
					"table": table, 
					"info": info,
					"options": newOptions,
				}, 
				...messageList, 
			]
		);
	} 

	const sendMessage = (message) => {
		axios.get("https://semantee.herokuapp.com/get", {params: {msg: message}})
		.then (
		  (response) => {
		  		// JSON.stringify(response.data.info)
				handleSetMessageList(response.data.sql_cmd, true, response.data.sql_respond, null, null);
				prompt = response.data.info.options.size > 0 ? "Select a query": "Semantee has nothing left to say. Reload to try again."	
				handleSetMessageList(prompt, false, null, null, response.data.info.options);
		  }
		)
		.catch(
			(error) => {
				handleSetMessageList("Semantee threw an error. Try again.", true, null, null, null)
			}
		);
	}

	return (
		<div>
			<section className="msger">
				<header className="msger-header">
					<div className="msger-header-title">
						<h5> <div className="circle"></div> Semantee Scripted SQLGen </h5>
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
												{message.text} <br/>
												{message.info && <span>Additional Info: {message.info}</span>}
												{message.table &&
													<MsgTable rows={message.table} />
												}
												{!message.is_semantee && message.options &&
													Object.keys(message.options).map((i) => {
														return <Button className="msg-button" onClick={() => sendMessage(message.options[i].input)}>{message.options[i].input}</Button>
													})
												}
											</div>
										</div>
									</div>
								</div>
						)})
					}
				</main>
			</section>
		</div>
	)
}

export default Msger;