function makeID() {
    let result = ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < 2; i++)
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    result += Math.random().toString().substr(2, 11)
    return result
}

function formatReview(text, event_id) {
    return {
        'text': text,
        'event_id': event_id
    }
}

export {formatReview}