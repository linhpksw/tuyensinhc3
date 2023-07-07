import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://linhpksw:Bmcmc20@tuyensinhc3.6ykojzr.mongodb.net/';
const client = new MongoClient(uri);

// Connect to MongoDB when the module is imported
client
    .connect()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

export { client };
