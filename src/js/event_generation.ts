import axios from "axios";

async function getRandomRestaurants() {
    try {
        return await axios.get("https://random-data-api.com/api/restaurant/random_restaurant?size=50");
    } catch(err) {
        console.log("error: ", err);
    }
}