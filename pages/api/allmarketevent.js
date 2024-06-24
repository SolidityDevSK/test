import { connectMongoDB } from "@/lib/mongodb/mongodb";

const handler = async (req, res) => {
  try {
    const { db, client } = await connectMongoDB();
    console.log("Connected to MongoDB");

    const allData = await db.collection('allmarketevent').find({}).toArray();
    console.log("Fetched data:", allData);

    client.close();
    console.log("Returning all data");

    return res.status(200).json({ message: 'Data fetched successfully', data: allData });
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ message: error.message });
  }
};

export default handler;
