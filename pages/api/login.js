import { connectMongoDB } from "@/lib/mongodb/mongodb";

const handler = async (req, res) => {
  const { body } = req;
  console.log("Request body:", body);

  const { walletaddress } = body;

  try {
    const { db, client } = await connectMongoDB();
    console.log("Connected to MongoDB");

    const existingUser = await db.collection('users').findOne({ walletaddress });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      client.close();
      console.log("User found, returning success response");
      return res.status(200).json({ message: 'Login is successfully', user: existingUser });
    }

    client.close();
    console.log("User not found, returning 404 response");
    return res.status(404).json({ message: 'User not found', user: "" });
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ message: error.message });
  }
};

export default handler;
