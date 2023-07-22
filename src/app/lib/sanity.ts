import { createClient } from "next-sanity"

const projectId = `6fa8y8d3`
const dataset = 'production'
const apiVersion = '2023-07-20'

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
});

export async function getFeaturedEvents() {
    const events = await client.fetch(`*[_type == "post" && isFeatured == true]`)
    return events
  }
  
export async function getAllEvents() {
    const events = await client.fetch(`*[_type == "post"]`)
    return events
}
  
export async function getFilteredEvents(dateFilter) {
//   const { year, month } = dateFilter;

//   let filteredEvents = DUMMY_EVENTS.filter((event) => {
//     const eventDate = new Date(event.date);
//     return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    
    const { year, month } = dateFilter;

    const events = await client.fetch(`*[_type == "post"]`)
    let filteredEvents = events.filter((event => {
        const eventDate = new Date(event.date);
        console.log(eventDate)
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    }));
    

  return filteredEvents;
}

export async function getPaths() {
    const paths = await client.fetch(
      `*[_type == "post" && defined(slug.current)][].slug.current`
    )
    return paths
}

export async function getEventBySlug(slug) {
    const events = await client.fetch(`*[_type == "post" && slug.current == "${slug}"]`)
    return events[0]
}



export async function getAllPossiblePaths() {

    const dates = await client.fetch(`*[_type == "post"]{date}`)

    const paths = dates.map((date) => ({
      params: { slug: date },
    }));
    return dates;
  }

export default client


// // Replace this with your actual data fetching logic to get the dynamic paths
// const dynamicPaths = [
//   ['12', '2'],
//   ['2021', '5'],
//   // Add more arrays for other dynamic paths as needed
// ];

// const path = await getAllPossiblePaths()

// const routes = path.map((date) => {
//   const newDate = new Date(date.date);
//   const year = newDate.getFullYear();
//   const month = newDate.getMonth() + 1;

//   return {
//     myDate: {
//       year,
//       month
//     }
//   }
// })



// const formattedList = routes.map(item => [
//   item.myDate.year.toString(), 
//   item.myDate.month.toString()
// ]);
// console.log(formattedList[0][0])

// const paths = formattedList.map((slug) => ({
//   params: { slug: [`${slug}`] }, // Make sure "slug" is provided as an array with two elements
// }));
// console.log(pats)
// return {
//   paths,
//   fallback: false, // or 'blocking' if you want to use incremental static regeneration
// };
// }
