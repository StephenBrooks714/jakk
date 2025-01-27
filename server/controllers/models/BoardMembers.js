const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardMemberSchema = new Schema({
    name: String,
    position: String,
    bio: String,
    image: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("BoardMember", boardMemberSchema);