const moods = ['neutral', 'anger', 'joy', 'fear', 'sadness'];
const greetings = ['Hello', 'Hi there!', 'Holla!', 'Hey!', 'Yo!'];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

let timeout = 0;

export function startup() {
    return dispatch => {
        dispatch({
            type: 'bot.set_emotion',
            emotion: getRandomElement(moods)
        });

        timeout = setTimeout(() => {
            dispatch({
                type: 'bot.received_message',
                message: getRandomElement(greetings),
                synthetic: true
            });
            timeout = 0;
        }, 3000);
    }
}


export function sendMessage(message, messages, emotion) {
    if (timeout != 0) {
        clearTimeout(timeout);
        timeout = 0;
    }

    const context = messages.filter(x => x.sender === 'user').map(x => x.content);
    context.push(message);

    return dispatch => {
        dispatch({
            type: 'bot.send_message',
            message
        });
        fetch(process.env.REACT_APP_CHAT_SERVER + '/cakechat_api/v1/actions/get_response', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ context, emotion })
        })
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: 'bot.received_message',
                    message: data.response
                });
            });
    }
}