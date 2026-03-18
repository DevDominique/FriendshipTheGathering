import { pool } from './database.js';
import eventData from '../data/events.js';
import locationData from '../data/locations.js';

const createLocationsTable = async () => {

    const createTableQuery = `
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        zip VARCHAR(255) NOT NULL
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('📍 Locations table created successfully!');

    } catch (err) {
        console.error('⚠️ Error creating locations table: ', err);
    };
};

const createEventsTable = async () => {

    const createTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            description TEXT NOT NULL,
            location_id INTEGER REFERENCES locations(id)
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('✅ Events table created successfully!');
    } catch (err) {
        console.error('⚠️ Error creating events table: ', err);
    };
};

const seedLocationsTable = async () => {

    await createLocationsTable();

    for (const location of locationData) {

        const insertQuery = {
            text: 'INSERT INTO locations (name, image, address, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6)'
        };

        const values = [
            location.name,
            location.image,
            location.address,
            location.city,
            location.state,
            location.zip
        ];

        try {
            await pool.query(insertQuery, values);
            console.log(`📍 ${location.name} added successfully!`);
        } catch (err) {
                console.error('❌ Error inserting location: ', err);
        };
    };
};

const seedEventsTable = async () => {

    await createEventsTable();

    const locationsResult = await pool.query('SELECT id, name FROM locations');
    const locations = locationsResult.rows;

    eventData.forEach((event) => {

        const location = locations.find(l => l.name === event.location);

        if (!location) {
            console.error(`⚠️ No matching location found for event: ${event.name}`);
            return;
        };

        const insertQuery = {
            text: 'INSERT INTO events (name, image, date, time, description, location_id) VALUES ($1, $2, $3, $4, $5, $6)'};

        const values = [
            event.name,
            event.image,
            event.date,
            event.time,
            event.description,
            location.id
        ];


        pool.query(insertQuery, values)
            .then (() => {
                console.log(`📅 ${event.name} added successfully!`);
            })
            .catch ((err) => {
                console.error('❌ Error inserting events: ', err);
            });
    });
};

const resetDatabase = async() => {
    await seedLocationsTable();
    await seedEventsTable();
};

if (process.argv[1].includes('reset.js')) {
    resetDatabase();
};
