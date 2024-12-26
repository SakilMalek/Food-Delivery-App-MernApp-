const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://Foodie:Malekalam@cluster0.r0oqo.mongodb.net/Foodie?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connected Successfully to MongoDB");
    
    const fetched_data = await mongoose.connection.db.collection("food_item");
    try {
        const data = await fetched_data.find({}).toArray();
        global.food_item = data.length > 0 ? data : []; // Handling empty data
        const foodCategory = await mongoose.connection.db.collection("Food_Category");
        const category = await foodCategory.find({}).toArray();
        global.Food_Category = category.length>0 ? category : [];
        //console.log("Fetched data:", global.food_item);
    } catch (err) {
        console.error("Failed to fetch data from MongoDB:", err);
        process.exit(1);  // Exit the process if the connection fails
    }
};

module.exports = mongoDB;
