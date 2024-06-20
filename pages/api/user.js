import { connectMongoDB } from "@/lib/mongodb/mongodb";

const handler = async (req, res) => {
  const { body } = req;
  const { walletaddress, imgUrl } = body;
  console.log("Request body:", body);

  try {
    const { db, client } = await connectMongoDB();
    console.log("Connected to MongoDB");

    // Ensure index is created only once
    await db.collection('users').createIndex({ walletaddress: 1 }, { unique: true });
    
    const existingUser = await db.collection('users').findOne({ walletaddress });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      client.close();
      console.log("User already exists, returning success response");
      return res.status(200).json({ message: 'User is already registered', user: existingUser });
    }

    const currentDate = new Date();
    const result = await db.collection('users').insertOne({
      walletaddress,
      imgUrl,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    console.log("Insert result:", result);

    const insertedUser = await db.collection('users').findOne({ _id: result.insertedId });
    console.log("Inserted user:", insertedUser);

    res.status(201).json({ message: 'User saved successfully', user: insertedUser });
    client.close();
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ message: error.message });
  }
};

export default handler;
