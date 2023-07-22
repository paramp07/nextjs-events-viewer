import { getFeaturedEvents } from '../src/app/lib/sanity';
import EventList from '../components/events/event-list';
// import { createClient } from "next-sanity"
// import client from '../src/app/lib/sanity'



function HomePage(props) {
  const { featuredEvents } = props
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;

// const projectId = `6fa8y8d3`
// const dataset = 'production'
// const apiVersion = '2023-07-20'

// const client = createClient({
//     projectId,
//     dataset,
//     apiVersion,
//     useCdn: false,
// });

export async function getStaticProps() {
  // const events = await client.fetch(`
  //   *[_type == "post"]
  // `);
  const featuredEvents = await getFeaturedEvents()


  return {
    props: {
      featuredEvents
    }
  }
}