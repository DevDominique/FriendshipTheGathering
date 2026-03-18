import React from 'react';
import { useRoutes, Link } from 'react-router-dom';
import Locations from './pages/Locations';
import LocationEvents from './pages/LocationEvents';
import Events from './pages/Events';
import './App.css';

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/locations/:id/events',
      element: <LocationEvents/>
    },
    {
      path: '/events',
        element: <Events /> }

  ])

  return (
    <div className='app'>

      <header className='main-header'>
        <h1>Friendship The Gathering</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App
