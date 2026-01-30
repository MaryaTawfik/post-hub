import mongoose, { Schema, Document } from 'mongoose';


export interface IPost extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  imageUrl?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'A post must have a title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
      type: String,
      required: [true, 'Post content cannot be empty']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blogger', 
      required: [true, 'Each post must have an author']
    },
    imageUrl: {
      type: String,
      required: false,
      default: ''
    },
    tags: {
      type: [String],
      default: [],
      lowercase: true, 
      trim: true       
    }
  },
  { 
    timestamps: true 
  }
);


postSchema.index({ tags: 1 });

export default mongoose.model<IPost>('Post', postSchema);