import { connectMongoDB } from "@/lib/mongodb/mongodb";

const listDomains = async (req, res) => {
    if (req.method == 'GET') {

        try {
            const { db } = await connectMongoDB();
            const activeItem = await db.collection('activemarket').find({}).toArray();

            res.status(200).json(activeItem);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
};

export default listDomains;
