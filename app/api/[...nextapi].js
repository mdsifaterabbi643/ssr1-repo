const { MongoClient } = require("mongodb"); // Assuming you have `mongodb` installed as a dependency with npm or yarn

const uri = process.env.MONGO; // Use environment variable for MongoDB connection string

export default async function handler(req, res) {
  const method = req.method;
  const collectionName = req.query.collection; // Assuming collection name is in query string

  // Connect to MongoDB (modify as needed for your API logic)
  let client;
  let db;
  try {
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error connecting to database" });
    return;
  }

  // Handle different API requests based on method
  switch (method) {
    case "GET":
      // Handle GET requests based on collection name
      if (!collectionName) {
        res.status(400).json({ message: "Missing collection name in query" });
        return;
      }

      let data;
      try {
        switch (collectionName) {
          case "faqs":
            // Get FAQs (modify as needed)
            const faqCollection = db.collection("faqs");
            data = await faqCollection.find().toArray();
            break;
          case "users":
            // Get users (modify as needed)
            const userCollection = db.collection("users");
            data = await userCollection.find().toArray();
            // You might want to filter user data based on security needs
            break;
          default:
            res
              .status(404)
              .json({ message: `Collection '${collectionName}' not found` });
            return;
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching data" });
      } finally {
        await client.close();
      }

      res.status(200).json(data);
      break;

    // Add additional cases for other methods (POST, PUT, DELETE, etc.) as needed
    // Replace the example GET logic with your actual API logic

    default:
      res.setHeader("Allow", ["GET"]); // Allow only GET requests by default
      res.status(405).end(`Method ${method} Not Allowed`);
  }

  // Set CORS headers (modify allowed origins as needed)
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://ssr1-repo.onrender.com"
  ); // Replace with your deployed app's URL (if different)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT,PATCH,  DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

