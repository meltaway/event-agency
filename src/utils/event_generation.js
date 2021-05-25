const fetch = require("node-fetch");

function getRandomDate(from, to) {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
}

async function postEvents() {
    const response = await getRandomRestaurants();
    const events = formatEvents(await response.json());
    events.forEach((event) => {
        fetch('http://localhost:3001/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event, null, 4),
        });
    })
}

async function getRandomRestaurants() {
    return await fetch(`https://random-data-api.com/api/restaurant/random_restaurant?size=50`);
}

function formatEvents(response) {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return response.map((event) => {
        return {
            'id': event.id,
            'uid': event.uid,
            'event': event.name,
            'location': event.address,
            'date': getRandomDate(new Date(2000, 1, 1), today).toDateString(),
            'description': event.description,
        }
    })
}

// const response = await getRandomRestaurants();
// const events = formatEvents(await response.json());

postEvents()