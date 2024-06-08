import { connectMongoDB } from "@/lib/mongodb/mongodb";

const listDomains = async (req, res) => {
    if (req.method == 'GET') {

        try {
            const { db } = await connectMongoDB();
            const likes = await db.collection('likes').find({}).toArray();

            res.status(200).json(likes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
    if (req.method == 'POST') {

        const { tokenId, walletAddress } = req.body;

        if (!tokenId || !walletAddress) {
            return res.status(400).json({ message: 'TokenId and WalletAddress are required.' });
        }

        try {
            const { db } = await connectMongoDB();

            // Beğeni işlemini gerçekleştir
            const result = await db.collection('likes').updateOne(
                { tokenId },
                {
                    $inc: { likes: 1 }, // Beğeni sayısını 1 artır
                    $addToSet: { userHasLiked: walletAddress } // userHasLiked dizisine cüzdan adresini ekle
                },
                { upsert: true } // Eğer bu tokenId için bir kayıt yoksa, yeni bir kayıt oluştur
            );

            if (result.matchedCount === 0 && result.upsertedCount === 0) {
                return res.status(500).json({ message: 'Failed to like the domain.' });
            }

            res.status(200).json({ message: 'Domain liked successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
};

export default listDomains;
