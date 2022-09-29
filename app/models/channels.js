import mongoose from "mongoose"

const channelSchema = new mongoose.Schema({
    channelUsers:[
        {
        type: mongoose.Schema.Types.ObjectId, ref: 'wc-user'
    }
],
    messages:[    {
        senderEmail:{type:String, default: ''},
        text:{type:String, default: ''},
        addedOn:{type:Number, default: Date.now()},
    }
],
    addedOn:{type:Number, default: Date.now()},
})

channelSchema.method({
    saveData: async function () {
        return this.save()
    }
})
channelSchema.static({
    findData: function (findObj) {
        console.log('findData')
        return this.find(findObj).populate({path: 'channelUsers'})
    },
    findOneData: function (findObj) {
        console.log('find one')
        return this.findOne(findObj).populate('channelUsers')
    },
    findOneAndUpdateData: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })
    },
})

export default mongoose.model('wc-channel', channelSchema)