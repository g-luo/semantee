import React, { Component } from 'react';
import axios from 'axios';
import Image from '../elements/Image';

function sendMessage() {
	axios.get("http://localhost:5000/", {msg: "hi"})
	.then (
	  (response) => {
	    console.log(response);
	  }
	)
	.catch(
	  (error) => {
	    console.log('Could not log in');
	  }
	);
}

sendMessage();

const send_icon = require('./../../assets/images/icons/paper-plane.svg');
const seamanatee_profile = require('./../../assets/images/seamanatee.jpeg');

const Msger = ({
  ...props
}) => (
	<div>
		<section className="msger">
	        <header className="msger-header">
	            <div className="msger-header-title">
	                <h5> <div className="circle"></div> Semantee SQLGen </h5>
	            </div>
	        </header>

	        <main className="msger-chat">
	            <div className="msg left-msg">
	                <Image 
	                	className="msg-img"
	                	src={seamanatee_profile}
	                	height="10"
	                	width="10"
	                />
	                <div>
		                <div className="msg-info-name">Semantee</div>
		                <div className="msg-bubble">
		                    <div className="msg-info">
		                        <div className="msg-info-time"></div>
		                    </div>

		                    <div className="msg-text">
		                        Hi, welcome Semantee's SQL generator. Ask any question you want to get the correct query. 😄
		                    </div>
		                </div>
		            </div>
	            </div>

	        </main>

	        <form className="msger-inputarea">
	            <input type="text" className="form-input msger-input" id="textInput" placeholder="Enter your message..." />
	            <button type="submit" className="msger-send-btn">
	            	<b>Send</b>
                 </button>
	        </form>
	    </section>
	</div>
)

export default Msger;