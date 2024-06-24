import { connectMongoDB } from "@/lib/mongodb/mongodb";

const listDomains = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { db } = await connectMongoDB();
            const mintedDomain = await db.collection('minteddomain').find({}).toArray();

            res.status(200).json(mintedDomain);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'POST') {
        const { domainName } = req.body;

        if (!domainName) {
            res.status(400).json({ message: 'Domain name is required' });
            return;
        }

        try {
            const { db } = await connectMongoDB();
            const mintedDomain = await db.collection('minteddomain').findOne({ DomainName: domainName });

            if (mintedDomain) {
                res.status(200).json(mintedDomain);
            } else {
                res.status(404).json({ message: 'Domain not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default listDomains;
