import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Issue = new Schema({
    title: {
        type: String
    },
    responsible: {
        type: String
    },
    description: {
        type: String
    },
    serverity: {
        type: String
    },
    status: {
        type: String,
        default: 'open'
    }
});


export default mongoose.model('Issue', Issue);