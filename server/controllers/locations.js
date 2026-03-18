import { pool } from "../config/database.js";

const getLocations = async (req, res) => {

    try {
        const selectQuery = `SELECT * FROM locations ORDER BY id ASC`;
        const results = await pool.query(selectQuery);
        res.status(200).json(results.rows);

    } catch (error) {
        res.status(409).json({error: error.message});
    };
};

const getEventsByLocation = async (req, res) => {

    try{
        const locationId = req.params.id;

        console.log("Hitting /locations/:id/events with id:", locationId);

        const locationQuery = `
            SELECT id, name, image, address, city, state, zip FROM locations WHERE id = $1
        `;

        const locationResult = await pool.query(locationQuery, [locationId]);
        const location = locationResult.rows[0];

        const eventsQuery = `
            SELECT id, name, image, date, time, description, location_id FROM events WHERE location_id = $1 ORDER BY id ASC
        `;

        const eventsResult = await pool.query(eventsQuery, [locationId]);

        res.status(200).json({
            location: location,
            events: eventsResult.rows
        });

    } catch (error) {
        res.status(409).json({error: error.message})
    }
};

export default {
    getLocations,
    getEventsByLocation
};
