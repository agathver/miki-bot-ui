import React from 'react';

import sendImg from '../images/send.svg';
import './TextInput.css';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    handleSendClick = (e) => {
        e.preventDefault();
        this.props.onSendMessage(this.state.text);
    }

    handleTextChange = (e) => {
        this.setState({
            text: e.target.value
        });
    }

    render() {
        return (
            <form class="TextInput">
                <input type="text" value={this.state.text} placeholder="Type your message..." onChange={this.handleTextChange} />
                <button type="submit" onClick={this.handleSendClick}>
                    <img src={sendImg} />
                </button>
            </form>
        );
    }
}

export default TextInput;