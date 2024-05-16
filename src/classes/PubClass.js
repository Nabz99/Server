import { create as _create, find as _find, findById as _findById, updateOne, deleteOne } from "../models/PubModel"

class Pub {

    static async create(pub) {

        const t = await _create(pub)
        return t
    }

    static async find() {

        const t = await _find().populate('client').sort({ $natural: -1 }).exec()
        return t
    }

    static async findById(pub_id) {

        const t = await _findById(pub_id).exec()
        return t
    }

    static async update(id, pub) {

        const t = await updateOne({ _id: id }, { $set: pub }).exec()
        return t
    }

    static async remove(pub) {

        const t = await deleteOne({ _id: pub }).exec()
        return t
    }

    static async findByClient(clientId) {

        const t = await _find({client: clientId}).sort({ $natural: -1 }).exec()
        return t
    }
}

export default Pub