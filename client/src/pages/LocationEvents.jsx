import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEventsByLocation} from '../services/LocationsAPI';
import Event from '../components/Event';
import '../css/LocationEvents.css';

const LocationEvents = () => {
    const {id} = useParams();
    const [location, setLocation] = useState({});
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEventsByLocation(id).then((data) => {
            setLocation(data.location);
            setEvents(data.events);
        });
    }, [id]);

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location?.image} />
                </div>

                <div className='location-info'>
                    <h2>{location?.name}</h2>
                    <p>{location?.address}, {location?.city}, {location?.state} {location?.zip}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            name={event.name}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                            description={event.description}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    );
};

export default LocationEvents;
