const { getDb } = require('./../database')
const { ObjectId } = require('mongodb')

class Model {
    _id
    static collectionName
    constructor(attributes) {
        for(const attribute in attributes) {
            console.log(attributes[attribute])
            this[attribute] = attributes[attribute]
        }
        console.log(this)
    }

    static make(attributes) {
        return new this(attributes)
    }

    async save() {
        if(this._id) {
            await this.constructor.getCollection().updateOne({ _id: new ObjectId(this._id)}, {$set: this})
        }
        else {
            const data = await this.constructor.getCollection().insertOne(this)
            this._id = data.isertedId
        }

        return this
    }

    set(attributes) {
        for(const attribute in attributes) {
            this[attribute] = attributes[attribute]
        }
        
        return this
    }

    static get() {
        return this.getCollection().find().toArray()
    }

    static async findByPk(id) {
        const model = await this.getCollection().findOne({ _id: new ObjectId(id) })
        console.log(model)
        return this.make(model)
    }
    static findOneByFilter(filter, options = {}) {
        return this.getCollection().findOne(filter, options)
    }
    static findManyByFilter(filter, options = {}) {
        return this.getCollection().find(filter, options)
    }
    destroy() {
        this.constructor.getCollection().deleteOne({ _id: new ObjectId(this._id)})
    }
    static getCollection() {
        return getDb().collection(this.collectionName)
    }

}

module.exports = Model