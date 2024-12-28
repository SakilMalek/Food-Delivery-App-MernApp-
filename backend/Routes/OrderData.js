const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// Default images for items
const defaultImages = {
    "Chicken Tikka": "https://yourserver.com/images/chicken-tikka.jpg",
    "Paneer Tikka": "https://yourserver.com/images/paneer-tikka.jpg",
    "Chilli Paneer": "https://yourserver.com/images/chilli-paneer.jpg",
};

router.post("/orderData", async (req, res) => {
    let data = req.body.order_data;

    // Add current date and time in ISO format
    const currentDateTime = new Date().toISOString();
    await data.splice(0, 0, { Order_date: currentDateTime });

    // Ensure each item has an 'img' field
    data.forEach(item => {
        if (!item.img) {
            item.img = defaultImages[item.name] || "https://via.placeholder.com/150"; // Use default or placeholder image
        }
    });

    let eId = await Order.findOne({ email: req.body.email });
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data],
            }).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    } else {
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            ).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
});

// Endpoint to fetch user's order data
router.post("/myorderData", async (req, res) => {
    try {
        const myData = await Order.findOne({ email: req.body.email });

        if (!myData) {
            return res.status(404).json({ message: "No orders found for this email." });
        }

        res.json({ orderData: myData });
    } catch (error) {
        console.error("Error in /myorderData:", error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
