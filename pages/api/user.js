import { connectMongoDB } from "@/lib/mongodb/mongodb";

const handler = async (req, res) => {
  const {body } = req;
    const { walletaddress, imgUrl } = body;
    try {
      const { db, client } = await connectMongoDB();
      await db.collection('users').createIndex({walletaddress: 1 }, { unique: true });
       
      const existingUser = await db.collection('users').findOne({  walletaddress });

      if (existingUser) {
        client.close();
        return res.status(200).json({ message: 'User is already registered', user: existingUser }); 
      }

      const currentDate = new Date();
      const result = await db.collection('users').insertOne({
        walletaddress,
        imgUrl,
        createdAt: currentDate,
        updatedAt: currentDate,
      }); 
      const insertedUser = await db.collection('users').findOne({ _id: result.insertedId });
      res.status(201).json({ message: 'User saved successfully', user: insertedUser });
      client.close();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
};

export default handler;
