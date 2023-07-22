import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents, getFilteredEvents } from '../../src/app/lib/sanity';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getAllPossiblePaths } from '../../src/app/lib/sanity';

function FilteredEventsPage(props) {
  const { filteredEvents } = props
  console.log(filteredEvents)
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className='center'>Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });
  const date = new Date(numYear, numMonth - 1);
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  // const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// async function getPaths() {
//   // Replace this with your actual implementation to fetch dynamic paths
//   const paths = [
//     ["event1"], // Example: Single path with one dynamic segment
//     ["category", "event2"], // Example: Two segments in the path
//     ["category", "subcategory", "event3"], // Example: Three segments in the path
//   ];

//   return paths;
// }



export async function getStaticPaths() {
  // Replace this with your actual data fetching logic to get the dynamic paths
  const dynamicPaths = [
    ['12', '2'],
    ['2021', '5'],
    // Add more arrays for other dynamic paths as needed
  ];

  const path = await getAllPossiblePaths()

  const routes = path.map((date) => {
    const newDate = new Date(date.date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;

    return {
      myDate: {
        year,
        month
      }
    }
  })



  const formattedList = routes.map(item => [
    item.myDate.year.toString(), 
    item.myDate.month.toString()
  ]);
  console.log(formattedList + '\n' + dynamicPaths)


  const paths = formattedList.map((slugArray) => ({
    params: { slug: slugArray }, // Make sure "slug" is provided as an array with two elements
  }));

  console.log(paths)

  return {
    paths,
    fallback: true, // or 'blocking' if you want to use incremental static regeneration
  };
}



export async function getStaticProps(context) {
  const { params } = context;
  const eventSlug = params.slug;

  const filteredYear = eventSlug[0];
  const filteredMonth = eventSlug[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    const isInvalid = true;
    return {
      props: {
        isInvalid
      }
    }
  }
  
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  const date = new Date(numYear, numMonth - 1);


  const data = {
    filteredEvents: filteredEvents, 
    date: date}
  
  return {
    props: {
      filteredEvents
    }
  }
  


}

export default FilteredEventsPage;
