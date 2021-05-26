const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //user id
            author: "60a77fa0bc038a2a44dbec03",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            geometry: {
                "type": "Point",
                "coordinates": [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            price,
            images: [
                {
                    "url": "https://res.cloudinary.com/dgzoquwfo/image/upload/v1621755767/YelpCamp/xs60kgf5jyhe6evz6tsc.jpg",
                    "filename": "YelpCamp/xs60kgf5jyhe6evz6tsc"
                },
                {
                    "url": "https://res.cloudinary.com/dgzoquwfo/image/upload/v1621755779/YelpCamp/qm6zokkd5qenazwokstx.jpg",
                    "filename": "YelpCamp/qm6zokkd5qenazwokstx"
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})