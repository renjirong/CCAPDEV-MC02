const express = require('express');
const router = express.Router();

const menuController = require('../controller/menuController')



// Login Page
router.get('/login', (req, res) => {
    const response = {
        title: "Login",
        error: req.query.error
    }
    res.render("login", response)
});

// Reg Page
router.get('/register', (req, res) => res.render("register"));

// Librarian Login Page
router.get('/libLogin', (req, res) => res.render("LibrarianLogin"));
// Librarian Page
router.get('/lib', (req, res) => res.render("librarian"));

router.get('/userExists', (req, res) => res.render("userExists"));

router.get('/regSuccess', (req, res) => res.render("regSuccess"));

router.post('/register', menuController.register);
 



router.post("/libLogin", menuController.login);

router.post("/borrow", function(req, res){
    // console.log(req.body)
    res.render("/borrowBooks")
    
})

module.exports = router;
