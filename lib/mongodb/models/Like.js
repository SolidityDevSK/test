import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
    unique: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  likers: [{
    type: String,
    required: true,
  }],
}, { timestamps: true });

export default mongoose.models.Like || mongoose.model('Like', likeSchema);
