import { Fragment } from 'react';
import { getEventBySlug } from '../../src/app/lib/sanity';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import { getPaths } from '../../src/app/lib/sanity';



function EventDetailPage(props) {
  const { event } = props


  if (!event || event == undefined) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticPaths() {
  // const paths = await client.fetch(
  //   `*[_type == "post" && defined(slug.current)][].slug.current`
  // )
  const paths = await getPaths();

  return {
    // paths: paths.map((slug) => ({params: {slug}})),
    paths: paths.map((slug) => ({params: {eventId: slug}})),
    // paths: [
    //   { params: { eventId: 'networking-for-introverts' } }
    // ],
    fallback: false,
  }
}


export async function getStaticProps(context) {
  const { params } = context;
  const eventSlug = params.eventId
  
  const event = await getEventBySlug(eventSlug);
  return {
    props: {
      event
    }
  }
}




export default EventDetailPage;
