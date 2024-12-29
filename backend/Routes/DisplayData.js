const express = require('express')
const router = express.Router()

router.post("/foodData",  (req, res) => {
    try {
        // Send the global food_item as a JSON response
        res.send([global.food_item , global.Food_Category]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
