import dotenv from "dotenv";
import sequelize from "../config/database.js";
import Exhibit from "../models/exhibit.js";

dotenv.config();

const exhibits = [
  {
    slug: "green-sea-turtle",
    name: "Green Sea Turtle",
    category: "Marine Reptile",
    summary: "A graceful marine reptile that helps maintain healthy seagrass ecosystems.",
    description: "The green sea turtle (Chelonia mydas) is a majestic marine reptile found in warm, tropical oceans around the world. Known for their graceful swimming and vital role in healthy ocean ecosystems, green sea turtles help maintain seagrass beds, which support a diverse range of marine life.",
    habitat: "Tropical & subtropical oceans, seagrass beds",
    diet: "Seagrass, algae, marine plants",
    lifespan: "50-70 years",
    conservationStatus: "Least concern",
    imageUrl: "/images/exhibits/green-sea-turtle.webp",
    mobileImageUrl: "/images/exhibits/green-sea-turtle-mobile.webp",
  },

  {
    slug: "mandarin-fish",
    name: "Mandarin Fish",
    category: "Reef Fish",
    summary: "A colourful reef fish recognised for its striking blue and orange patterns.",
    description: "The mandarin fish (Synchiropus splendidus) is a small tropical reef fish known for its vivid colours and intricate patterns. It lives around coral reefs in the western Pacific, moving along the seafloor while searching for tiny invertebrates to eat.",
    habitat: "Tropical coral reefs, sheltered lagoons",
    diet: "Small crustaceans, worms, tiny invertebrates",
    lifespan: "10-15 years (estimated in the wild)",
    conservationStatus: "Least concern",
    imageUrl: "/images/exhibits/mandarin-fish.webp",
    mobileImageUrl: null,
  },

  {
    slug: "seahorse",
    name: "Seahorse",
    category: "Marine Fish",
    summary: "A remarkable marine fish known for its curled tail and unusual reproduction.",
    description: "Seahorses are small marine fish that use their curled tails to hold onto seagrass and coral. Their unusual body shape helps them blend into their surroundings. One of their most fascinating adaptations is that the male carries developing young in a brood pouch before releasing them into the water.",
    habitat: "Seagrass beds, coral reefs, coastal waters",
    diet: "Small crustaceans and plankton",
    lifespan: "1-5 years (varies by species)",
    conservationStatus: "Varies by species",
    imageUrl: "/images/exhibits/seahorse.webp",
    mobileImageurl: null,
  },
];

const seedExhibits = async () => {
  try {
    await sequelize.authenticate();

    for (const exhibit of exhibits) {
      await Exhibit.upsert(exhibit);
    }

    console.log("AQUA+ exhibit data seeded successfully");
  } catch (error) {
    console.error("Unable to seed AQUA+ exhibits:", error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

seedExhibits();
