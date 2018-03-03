const initialState = {
    emotion: 'neutral',
    pendingMessages: 0,
    messages: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'bot.set_emotion':
            return {
                ...state,
                emotion: action.emotion
            };

        case 'bot.send_message':
            return {
                ...state,
                pendingMessages: state.pendingMessages + 1,
                messages: [...state.messages, {
                    sender: 'user',
                    content: action.message
                }]
            };

        case 'bot.received_message':
            return {
                ...state,
                pendingMessages: action.synthetic ? state.pendingMessages : state.pendingMessages - 1,
                messages: [...state.messages, {
                    sender: 'bot',
                    content: action.message
                }]
            };

        default:
            return state
    }
}