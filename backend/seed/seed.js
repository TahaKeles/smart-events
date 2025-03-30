// Sample event images - you can add more as needed
const eventImages = [
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1472653431158-6364773b2fda?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1464047736614-af63643285bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
];

// When creating events, add the image field
const createEvents = async (numEvents = 50) => {
  try {
    const events = [];
    for (let i = 0; i < numEvents; i++) {
      const randomCategory =
        eventCategories[Math.floor(Math.random() * eventCategories.length)];
      const randomHost = users[Math.floor(Math.random() * users.length)];

      // Get a random image from the eventImages array
      const randomImage =
        eventImages[Math.floor(Math.random() * eventImages.length)];

      events.push({
        title: faker.lorem.words(Math.floor(Math.random() * 3) + 2),
        description: faker.lorem.paragraph(),
        category: randomCategory,
        location: {
          type: "Point",
          coordinates: [
            parseFloat(faker.address.longitude()),
            parseFloat(faker.address.latitude()),
          ],
          address: faker.address.streetAddress(),
        },
        date: faker.date.future(),
        host: randomHost._id,
        attendees: [randomHost._id],
        maxAttendees: Math.floor(Math.random() * 50) + 10,
        price:
          Math.random() > 0.7
            ? parseFloat((Math.random() * 100).toFixed(2))
            : 0,
        image: randomImage, // Add the random image URL to the event
        // ... any other existing fields ...
      });
    }

    await Event.insertMany(events);
    console.log(`${events.length} events created successfully.`);

    return events;
  } catch (error) {
    console.error("Error creating events:", error);
    process.exit(1);
  }
};
