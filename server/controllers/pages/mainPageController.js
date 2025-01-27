const UserData = require("../models/Users");

const homePage = async (req, res) => {
    const user = await UserData.find({});
    res.render("index", {
        title: "Home Page for JAKK",
        user
    })
}

module.exports = {
    homePage
}