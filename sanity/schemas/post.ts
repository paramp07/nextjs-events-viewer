export default {
    name: 'post',
    type: 'document',
    title: 'Post',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
            title: 'Date',
            name: 'date',
            type: 'date',
            options: {
              dateFormat: 'YYYY-MM-DD',
              calendarTodayLabel: 'Today'
            }
        },
        {
            name: 'description',
            type: 'string',
            title: 'Description',
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            options: {
              hotspot: true // <-- Defaults to false
            },
        },
        {
            title: 'Is this post featured?',
            name: 'isFeatured',
            type: 'boolean'
        },
        {
            title: 'Location',
            name: 'location',
            type: 'string',
        },
        {
            name: 'slug',
            type: "slug",
            title: 'Slug',
            options: {
                source: 'title'
            }
        },
        
        
    ]
}