import React, {useEffect, useState} from 'react';
import { getAllEvents } from '../services/EventsAPI';
import Event from "../components/Event";

const Events = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        getAllEvents().then((data) => {
            if (data) {
                setEvents(data);
            }
        });
    }, []);

    return(
        <main className="events-page">
            <h1>Upcoming Events</h1>

            <div>
                {events.length > 0 ? (
                    events.map((event) => (
                        <Event
                            key={event.id}
                            id={event.id}
                            name={event.name}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                            description={event.description}
                        />
                    ))
                ):(
                    <h2>No upcoming events.</h2>
                )}
            </div>
        </main>
    );
};

export default Events;
