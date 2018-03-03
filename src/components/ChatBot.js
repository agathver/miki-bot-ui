import React from 'react';
import { connect } from 'react-redux';
import MessageView from './MessageView';
import TextInput from './TextInput';
import Message from './Message';

import { startup, sendMessage } from '../actions/bot.actions';
import './ChatBot.css';

class ChatBot extends React.Component {
    componentDidMount() {
        this.props.dispatch(startup());
    }

    handleSendMessage = (message) => {
        this.props.dispatch(sendMessage(message, this.props.messages, this.props.emotion));
    }

    render() {
        const { pendingMessages=0, messages=[] } = this.props;
        return (
            <div class="ChatBot">
                <MessageView>
                    {messages.map(message => (
                        <Message sender={message.sender}>
                            {message.content}
                        </Message>
                    ))}
                    {/*  Show loading when pending messages > 0 */}
                    {pendingMessages > 0 && <Message sender="bot" loading>
                        <span className="loading-dots">&nbsp;&nbsp;&nbsp;</span>
                    </Message>}
                </MessageView>
                <TextInput onSendMessage={this.handleSendMessage} />
            </div>
        );
    }
}

export default connect(state => state.bot)(ChatBot);
