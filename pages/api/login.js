import { connectMongoDB } from "@/lib/mongodb/mongodb";

const handler = async (req, res) => {
  const {body } = req;
    const { walletaddress } = body;
    try {
      const { db, client} = await connectMongoDB();
      const existingUser = await db.collection('users').findOne({ walletaddress: { $eq: walletaddress } });
      if (existingUser) {
        client.close();
        return res.status(200).json({ message: 'Login is successfully', user: existingUser }); 
      }
      return res.status(404).json({ message: 'User not found', user: "" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
};

export default handler;
