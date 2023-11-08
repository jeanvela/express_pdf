import { Schema, model } from "mongoose";

const pdfSchema = new Schema({
    fielName: {
        type: String,
        require: true,
    },
    filePathUrl: {
        type: String,
        require: true,
    },
    public_id: {
        type: String,
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
})

export default model('Pdf', pdfSchema)