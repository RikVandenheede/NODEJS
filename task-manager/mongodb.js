// const mongodb = require("mongodb"); // installed mongodb npm library
// const MongoClient = mongodb.MongoClient; // nodig voor de 4 CRUD operaties uit te voeren
// const ObjectID = mongodb.ObjectId;

// Destructure van hierboven
const { MongoClient, ObjectId } = require("mongodb");

// /Users/Rik/mongodb/bin/mongod.exe --dbpath=/Users/Rik/mongodb-data

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

//conncet methode gebruikt om met de juiste serve te connceten(connectionURL)
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) return console.log("Unable to connect to the database"); //vangt error op, als je niet kan connceten met de db

    const db = client.db(databaseName); // db reference

    // CRUD operatie Create => in de DB zetten
    // db.collection("task").insertMany([
    //     {
    //         description: "running",
    //         completed: true
    //     },{
    //         description: "walking",
    //         completed: false
    //     },
    // ], (error, result) => {
    //     if(error) {
    //         return console.log("Unable to insert documents");
    //     }

    //     console.log(result.insertedIds);
    // })

    // CRUD operatie Read => uit de DB halen  
    //  FindOne
    // db.collection("users").findOne({_id: new ObjectId("6170a5a643dfc4d8df99b33f")}, (error, user) => {
    //     if(error) return console.log("Unable to fetch");
    //     console.log(user);
    // })
    // // Find
    // db.collection("users").find({ age:22 }).toArray((error, users) => {
    //     console.log(users);
    // })
    // // Count
    // db.collection("users").find({ age:22 }).count((error, count) => {
    //     console.log(count);
    // })

    db.collection("task").findOne({ _id: new ObjectId("61708c5cdca78a18829aed2f")}, (error, task) => {
        console.log(task);
    })

    db.collection("task").find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks);
    })
})