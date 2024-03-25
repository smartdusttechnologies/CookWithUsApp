import React, { useState } from 'react';
import './ChatBox.css';

function ChatBox() {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const handleSendMessage = () => {
        if (inputText.trim() !== '') {
            const newMessage = {
                text: inputText,
                sender: 'me' // Assuming the message is sent by the user (you can customize this as needed)
            };
            setMessages([...messages, newMessage]);
            setInputText('');
        }
    };

    // Function to handle receiving messages from others
    const handleReceiveMessage = (receivedText) => {
        const newMessage = {
            text: receivedText,
            sender: 'other' // Assuming the message is received from others (you can customize this as needed)
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className={`chat-box ${isOpen ? 'open' : ''}`}>
            <div className="chat-header">
                {/*<div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>*/}
                {/*    Open Chat*/}
                {/*</div>*/}
                {isOpen && (
                    <button className="close-button" onClick={() => setIsOpen(false)}>
                        &#10005;
                    </button>
                )}
            </div>
            <div className="messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={message.sender === 'me' ? 'my-message' : 'other-message'}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            {isOpen && (
                <div className="input-box">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            )}
        </div>
    );
}

export { ChatBox };
