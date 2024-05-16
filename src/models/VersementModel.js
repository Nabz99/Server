import { Schema, model } from 'mongoose';

const VersementSchema = new Schema({

    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client' // Reference to the Client model
    },
    montant: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

});

export { VersementSchema }; // Export AdminSchema as a named export
