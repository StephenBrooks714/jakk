const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: String,
    description: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    location: String,
    contact: String,
    email: String,
    image: String,
    datePosted: {
        type: Date,
        default: new Date()
    }
});

listingSchema.index({ title: "text", description: "text", location: "text" });
module.exports = mongoose.model("Listing", listingSchema);