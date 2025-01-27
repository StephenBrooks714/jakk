const express= require('express');
const router = express.Router();
const cache = require("./config/cache");

// main pages
const mainController = require('../controllers/pages/mainPageController');
router.get("/", cache(2), mainController.homePage);

// users routes
const usersController = require('../controllers/users/userController');
router.get("/register", cache(2), usersController.registerUser);
router.get("/login", cache(2), usersController.loginPage);
router.post("/store/user", cache(2), usersController.storeUser);
router.post("/login/user", cache(2), usersController.loginUser);
router.get("/logout", cache(2), usersController.logoutUser);

const listingController = require('../controllers/listings/listingMainController');
router.get("/newListing", cache(2), listingController.newListingPage);
router.post("/store/listing", cache(2), listingController.storeListing);
router.get("/singleListing/:id", cache(2), listingController.singleListingPage);
router.get("/listings", cache(2), listingController.listingData);
router.get("/delete/listing/:id", cache(2), listingController.deleteListing);

module.exports = router;