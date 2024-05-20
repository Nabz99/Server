const { model, Schema } = require('mongoose')

const CmdArticleSchema = new Schema({

    numero: {
        type: String,
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client' // Reference to the Client model
    },
    articles: [{
        article: {
            type: Schema.Types.ObjectId,
            ref: 'Article' // Reference to the Article model
        },
        quantite: Number,
        reference: String,
        designation: String,
        prixa: Number,
        prixu: Number,
        prixt: Number,
        prixd: Number
    }],
    livraison: {
        type: String,
        required: true
    },
    versement: {
        type: Number,
    },
    etat: {
        type: String,
        required: true
    },
    prixtotal: {
        type: Number,
        required: true
    },
    paye: {
        type: String,
        required: false
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

module.exports = model('CmdArticle', CmdArticleSchema, 'cmdarticles');