const StorePostDB = require('../models/Listings');
const SingleListing = require('../models/Listings');
const AllListings = require('../models/Listings');
const deleteListData = require('../models/Listings');
const path = require('path');

const newListingPage = (req, res) => {
    res.render("newListing", {
        title: "Create New Post"
    })
}

const listingData = async (req, res) => {
    const listings = await AllListings.find({}).sort({ createdAt: -1 }).populate('userid')
    res.render("listings", {
        title: "All Posts",
        listings
    })
}

const singleListingPage = async (req, res) => {
    const listData = await SingleListing.findById(req.params.id).populate('userid')
    res.render("singleListing", {
        title: "A Post about the blog.",
        listData
    })
}

const storeListing = (req, res) => {
    let image = req.files.image;
    let image2 = req.files.image2;
    image.mv(path.resolve(__dirname, '..', '..', '..', 'src/public/uploads', image.name), async (error) => {
        await image2.mv(path.resolve(__dirname, '..', '..', '..', 'src/public/uploads', image2.name), async (error) => {
            await StorePostDB.create({
                ...req.body,
                image: '/uploads/' + image.name,
                image2: '/uploads/' + image2.name,
                userid: req.session.userId
            })
            res.redirect('/listings')
        })
    })
}

const deleteListing = async (req, res) => {
    await deleteListData.findByIdAndDelete(req.params.id)
    res.redirect('/listings')
}

module.exports = {
    newListingPage,
    storeListing,
    listingData,
    singleListingPage,
    deleteListing
}