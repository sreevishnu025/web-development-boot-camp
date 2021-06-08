const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

const fruitsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit",fruitsSchema);

const fruit = new Fruit ({
    name: "Apple",
    rating: 7,
    review: "Ok I guess!!"
})

// fruit.save();

const banana = new Fruit({
    name: "Banana",
    rating: 8,
    review: "Good engergy boost!"
})

const orange = new Fruit({
    name: "orange",
    rating: 5,
    review: "Its so sour and weird!"
})

// Fruit.insertMany([ banana,orange ],function (err){
//     if(err) console.log(err);
// } )

Fruit.find(function (err, fruits){
    if(err) console.log(err);
    else {
        mongoose.connection.close();
        fruits.forEach(function (fruit){
            console.log(fruit.name);
        });
    }
})

