import React from 'react';
import './Message.css';
import botImg from '../images/bot.svg';

const Message = ({sender, loading, children}) => {
    return (
        <div className={`Message message-${sender}`}>
            {sender === 'bot' && (
                <div className="avatar-container">
                    <img width="40" height="40" className="avatar" src={botImg} />
                </div>
            )}
            <div className={`bubble ${loading ? 'loading' : ''}`}>
                {children}
            </div>
        </div>
    )
};

export default Message;