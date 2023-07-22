import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getAllEvents } from '../../src/app/lib/sanity';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage(props) {
  const {events} = props
  const router = useRouter();
  console.log(events)
  
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  console.log('events')
  return {
    props: {
      events
    }
  }
}

export default AllEventsPage;
