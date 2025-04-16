require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("../models/Event");

// Connect to Mongo
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected for seeding...");

    // Clear existing events
    await Event.deleteMany({});

    // Sample event images
    const eventImages = [
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ];

    // Insert sample events
    const eventsData = [
      {
        title: "Brooklyn Music Festival",
        category: "music",
        description:
          "Join us for an unforgettable weekend of music at the iconic Brooklyn Bowl! This year's festival features an incredible lineup of indie bands and local artists across multiple stages. Experience the vibrant energy of Brooklyn's music scene with performances ranging from indie rock to electronic, jazz to hip-hop. The festival includes food trucks from local favorites, craft beer gardens, and interactive art installations. Don't miss the special late-night DJ sets and the opportunity to discover emerging talent. Early bird tickets include access to exclusive workshops and meet-and-greets with the artists. This is more than just a music festival - it's a celebration of Brooklyn's creative community.",
        venue: "Brooklyn Bowl",
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
        location: {
          type: "Point",
          coordinates: [-73.9632, 40.7181], // Brooklyn Bowl, Williamsburg
        },
        attendees: [],
        capacity: 1000,
        image: eventImages[0],
      },
      {
        title: "Tech Summit NYC",
        category: "technology",
        description:
          "The premier technology conference of the year returns to the Javits Center! This three-day summit brings together industry leaders, innovators, and tech enthusiasts from around the world. Featuring keynote speeches from tech giants, hands-on workshops, and networking opportunities, the summit covers topics including artificial intelligence, blockchain, cybersecurity, and sustainable tech. Attendees will have access to exclusive product demos, career development sessions, and startup pitch competitions. The event includes a dedicated space for women in tech, mentorship programs, and a job fair with top tech companies. Whether you're a developer, entrepreneur, or tech enthusiast, this summit offers unparalleled opportunities for learning and growth in the tech industry.",
        venue: "Javits Center",
        dateTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
        location: {
          type: "Point",
          coordinates: [-74.002, 40.7579], // Javits Center, Manhattan
        },
        attendees: [],
        capacity: 2000,
        image: eventImages[1],
      },
      {
        title: "DUMBO Art Walk",
        category: "art",
        description:
          "Experience the vibrant art scene of DUMBO during this annual art walk event! Stroll through the historic streets of Brooklyn's most artistic neighborhood, where you'll discover works from over 50 local galleries and independent artists. The event features live painting demonstrations, interactive installations, and pop-up exhibitions in unique spaces. Meet the artists, learn about their creative processes, and even purchase original works. Special highlights include the waterfront sculpture garden, digital art projections on historic buildings, and performances by local musicians. The art walk also includes guided tours, artist talks, and workshops for all ages. Don't miss the opportunity to explore DUMBO's rich artistic heritage and contemporary creative scene.",
        venue: "DUMBO Arts District",
        dateTime: new Date(Date.now() + 72 * 60 * 60 * 1000),
        location: {
          type: "Point",
          coordinates: [-73.9903, 40.7033], // DUMBO, Brooklyn
        },
        attendees: [],
        capacity: 500,
        image: eventImages[2],
      },
      {
        title: "Smorgasburg Food Festival",
        category: "food",
        description:
          "Indulge in Brooklyn's most beloved food festival at Prospect Park! Smorgasburg brings together the city's most innovative chefs, food trucks, and artisanal producers for a culinary adventure like no other. Sample dishes from over 100 vendors, including award-winning restaurants, up-and-coming food entrepreneurs, and international cuisines. The festival features cooking demonstrations by celebrity chefs, mixology workshops, and food photography classes. Special areas include a craft beer garden, dessert alley, and a farmers market section. Don't miss the chance to try unique creations like ramen burgers, artisanal ice cream sandwiches, and globally-inspired street food. This is a food lover's paradise with something to satisfy every palate.",
        venue: "Prospect Park",
        dateTime: new Date(Date.now() + 96 * 60 * 60 * 1000),
        location: {
          type: "Point",
          coordinates: [-73.9687, 40.6602], // Prospect Park, Brooklyn
        },
        attendees: [],
        capacity: 2000,
        image: eventImages[3],
      },
      {
        title: "Central Park Yoga",
        category: "wellness",
        description:
          "Start your day with a rejuvenating yoga session in the heart of Central Park! This special morning event brings together yoga enthusiasts of all levels for a peaceful practice surrounded by nature. Led by experienced instructors, the session includes gentle warm-ups, traditional asanas, and guided meditation. The event provides yoga mats and props, along with complimentary herbal tea and healthy snacks. After the session, enjoy a guided nature walk through the park's most scenic spots. This is the perfect opportunity to connect with nature, meet like-minded individuals, and start your day with mindfulness and movement. Whether you're a beginner or an experienced yogi, this event offers a unique way to experience Central Park's beauty while nurturing your body and mind.",
        venue: "Central Park Great Lawn",
        dateTime: new Date(Date.now() + 120 * 60 * 60 * 1000),
        location: {
          type: "Point",
          coordinates: [-73.9686, 40.7812], // Central Park, Manhattan
        },
        attendees: [],
        capacity: 200,
        image: eventImages[4],
      },
      {
        title: "Jersey City Jazz Festival",
        category: "music",
        description:
          "Experience the soulful sounds of jazz at the annual Jersey City Jazz Festival! This three-day celebration of jazz music features performances by world-renowned artists and emerging talents. The festival takes place in the scenic Exchange Place area, offering stunning views of the Manhattan skyline. Enjoy multiple stages with different jazz styles, from traditional to contemporary, fusion to Latin jazz. The event includes masterclasses with jazz legends, instrument workshops, and jam sessions open to all musicians. Food vendors offer a variety of cuisines, and craft beer gardens provide the perfect accompaniment to the music. Don't miss the special sunset performances and the closing night fireworks display. This festival is a must-attend event for jazz enthusiasts and music lovers alike.",
        venue: "Exchange Place",
        dateTime: new Date(Date.now() + 144 * 60 * 60 * 1000),
        location: {
          type: "Point",
          coordinates: [-74.0324, 40.7161], // Exchange Place, Jersey City
        },
        attendees: [],
        capacity: 1500,
        image: eventImages[0],
      },
      {
        title: "Brooklyn Comedy Night",
        category: "entertainment",
        description:
          "Laugh the night away at Brooklyn's premier comedy venue, The Bell House! This special comedy night features a lineup of NYC's funniest comedians, including rising stars and established names in the comedy scene. The intimate setting creates the perfect atmosphere for an evening of laughter and entertainment. The show includes stand-up performances, improv comedy, and special guest appearances. The venue offers a full bar with craft cocktails and local beers, along with a menu of delicious snacks. After the show, stick around for the after-party where you can meet the comedians and enjoy more laughs. Whether you're a comedy aficionado or just looking for a fun night out, this event promises an unforgettable evening of entertainment.",
        venue: "The Bell House",
        dateTime: new Date(Date.now() + 168 * 60 * 60 * 1000),
        location: {
          type: "Point",
          coordinates: [-73.9876, 40.6781], // The Bell House, Brooklyn
        },
        attendees: [],
        capacity: 300,
        image: eventImages[1],
      },
      {
        title: "Hoboken Food Tour",
        category: "food",
        description:
          "Embark on a culinary journey through Hoboken's vibrant food scene! This guided food tour takes you to the city's most beloved restaurants, bakeries, and specialty food shops. Sample authentic Italian cuisine, artisanal chocolates, and local craft beers while learning about Hoboken's rich culinary history. The tour includes visits to family-owned establishments, where you'll meet the chefs and learn about their recipes and traditions. Special stops include a historic pizzeria, a renowned bakery, and a craft cocktail bar. The tour guide shares fascinating stories about Hoboken's food culture and architecture along the way. This is the perfect way to experience the authentic flavors of Hoboken while supporting local businesses.",
        venue: "Hoboken Downtown",
        dateTime: new Date(Date.now() + 192 * 60 * 60 * 1000),
        location: {
          type: "Point",
          coordinates: [-74.0287, 40.7379], // Hoboken, NJ
        },
        attendees: [],
        capacity: 50,
        image: eventImages[3],
      },
      {
        title: "Williamsburg Farmers Market",
        category: "food",
        description:
          "Discover the best of local produce and artisanal goods at the Williamsburg Farmers Market! This weekly market brings together farmers, bakers, and food producers from across the region. Browse through fresh seasonal fruits and vegetables, organic meats, artisanal cheeses, and homemade preserves. The market also features local crafts, handmade soaps, and unique gifts. Special events include cooking demonstrations by local chefs, live music performances, and children's activities. Meet the producers, learn about sustainable farming practices, and sample delicious treats. The market is committed to supporting local agriculture and small businesses, offering a true farm-to-table experience in the heart of Brooklyn.",
        venue: "McCarren Park",
        dateTime: new Date(Date.now() + 216 * 60 * 60 * 1000),
        location: {
          type: "Point",
          coordinates: [-73.9507, 40.7202], // McCarren Park, Brooklyn
        },
        attendees: [],
        capacity: 1000,
        image: eventImages[3],
      },
      {
        title: "Battery Park Meditation",
        category: "wellness",
        description:
          "Find your inner peace with a guided meditation session in the beautiful Battery Park! This special event combines mindfulness practice with the natural beauty of the waterfront. Led by experienced meditation instructors, the session includes breathing exercises, guided visualization, and silent meditation. The peaceful setting, with views of the harbor and Statue of Liberty, creates the perfect atmosphere for relaxation and reflection. The event includes a gentle yoga warm-up, followed by the meditation session and a closing tea ceremony. Participants receive a meditation guide and access to online resources for continued practice. Whether you're new to meditation or an experienced practitioner, this event offers a unique opportunity to connect with yourself and nature in one of NYC's most beautiful parks.",
        venue: "Battery Park",
        dateTime: new Date(Date.now() + 240 * 60 * 60 * 1000),
        location: {
          type: "Point",
          coordinates: [-74.0167, 40.7033], // Battery Park, Manhattan
        },
        attendees: [],
        capacity: 100,
        image: eventImages[4],
      },
    ];

    await Event.insertMany(eventsData);
    console.log("Dummy events seeded successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error(`Seeding Error: ${err}`);
    process.exit(1);
  });
