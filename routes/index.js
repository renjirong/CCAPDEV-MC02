const express = require('express');
const router = express.Router();


//Main Menu
router.get('/', (req, res) => {
    res.render("mainMenu")
});



module.exports = router;
