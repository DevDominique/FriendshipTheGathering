export function getAllLocations() {
    return fetch("http://localhost:3000/locations")
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error fetching locations: ", error);
        });
};

export function getEventsByLocation(id) {
    return fetch(`http://localhost:3000/locations/${id}/events`)
    .then((response) => response.json())
    .catch((error) => {
        console.error("Error fetching envents by location: ", error);
    });
};
