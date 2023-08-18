import mongoose from 'mongoose';

const connectDB = (url: string) => {
  console.log('connected to mongodb');

  return mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

export default connectDB;
