const StorePostDB = require('../models/Listings');
const SingleListing = require('../models/Listings');
const AllListings = require('../models/Listings');
const deleteListData = require('../models/Listings');
const SearchListing = require('../models/Listings');
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
    const listData = await SingleListing.findById(req.params.id).populate('userid').limit(10);
    res.render("singleListing", {
        title: "A Post about the blog.",
        listData
    })
}

const storeListing = (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', '..', '..', 'src/public/uploads', image.name), async (error) => {
        await StorePostDB.create({
            ...req.body,
            image: '/uploads/' + image.name,
            userid: req.session.userId
        })
        res.redirect('/listings')
    })
}

const deleteListing = async (req, res) => {
    await deleteListData.findByIdAndDelete(req.params.id)
    res.redirect('/listings')
}

const searchInfo = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        const searchData = await SearchListing.find({ $text: { $search: searchTerm, $caseSensitive:false, $diacriticSensitive: true } }).sort({_id: -1}).populate('userid');
        res.render("searches", {
            title: "Search results from your query",
            searchData
        })
    } catch (error) {
        res.status(500).send({message: error.message || 'Error Occured'})
    }
}

module.exports = {
    newListingPage,
    storeListing,
    listingData,
    singleListingPage,
    deleteListing,
    searchInfo
}