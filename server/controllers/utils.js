const { ObjectId } = require('mongoose').Types

// returns true if all items in arr are valid object ids
const allValidObjectIds = (arr) => arr.every(ObjectId.isValid)

// returns false if any of the given ids are invalid object ids
// or if any of them do not correspond to a document of docType
// in the database. returns true otherwise
const allValidDocumentIds = async (ids, docType) => {
    if(!allValidObjectIds(ids)) return Promise.resolve(false)
    const docs = await docType.find({
        _id: { $in: ids.map(ObjectId) }
    })
    return Promise.resolve(docs.length === ids.length)
}

// creates a new object containing the key:values specified
// from the original object
const pick = (obj, keys) => {
    var newObj = {}
    keys.forEach(k => {
        newObj[k] = obj[k]
    })
    return newObj
}

module.exports = {
    allValidDocumentIds,
    pick
}
