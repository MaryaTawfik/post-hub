export interface IPost {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}
