import React from 'react'
import ExploreBtn from './components/ExploreBtn'
import EventCard from './components/EventCard'
import { events} from '../lib/constants'

const page = () => {
  return (
    <section>
        <h1 className='text-center mt-5' >The hub for Every dev<br/>Event you can't miss</h1>
        <p className='text-center mt-5'>Hackathon meetups and conferences , All in one Place</p>
        <ExploreBtn/>
        <div className='mt-20 space-y-7'>
          <h3>Featured Events</h3>
          <ul className='events'>
            {events.map((event)=>(
              <li key = {event.title}>
                <EventCard {...event}/>
              </li>
            ))}
          </ul>
        </div>
    </section>
  )
}

export default page