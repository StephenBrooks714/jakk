const Users = require("../models/Users");
const bcrypt = require('bcrypt');

const registerUser = (req,res) =>{

    let username = ""
    let password = "";
    const data = req.flash('data')[0]

    if(typeof data!="undefined"){
        username = data.username
        password = data.password
    }

    res.render('register',{
        //errors: req.session.validationErrors
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    })
}

const storeUser = async (req,res) =>{
    await Users.create(req.body, (error, user) =>{
        if(error){
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('validationErrors',validationErrors)
            req.flash('data',req.body)
            return res.redirect('/register')
        }
        res.redirect('/login')
    })
}

const loginPage = (req, res) => {
    res.render("login", {
        title: "Login into your account"
    })
}

const loginUser = (req,res) =>{
    const { username,password } = req.body

    Users.findOne({username: username},function(error,user){
        if(user){
            bcrypt.compare(password, user.password, (error,same)=>{
                if(same){
                    req.session.userId = user._id
                    res.redirect('/')
                }
                else{
                    res.redirect('/login')
                }
            })
        }
        else{
            console.log("/::",user)
            res.redirect('/login')
        }
    })
}

const logoutUser = (req,res) =>{
    req.session.destroy()
    res.redirect('/')
}

module.exports = {
    storeUser,registerUser,loginPage,loginUser,logoutUser
}