export function getAllEvents() {
    return fetch("http://localhost:3000/events")
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error fetching events: ", error)
        });
};
