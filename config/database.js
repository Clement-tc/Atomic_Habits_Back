const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */ 

const conn = process.env.database_link;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});


const User = connection.model('User', UserSchema);
     
const TaskShema = new mongoose.Schema({
    User_id:String,
    description:String,
    GoalColor:String,
    title:String,


});

const  Task = connection.model('Task',TaskShema)

const ScorecardShema = new mongoose.Schema({
    User_id:String ,
    Scorecard_Habits:Array,
    Scorecard_Rate:Array
})
const Scorecard = connection.model('Scorecard',ScorecardShema)
// Expose the connection
module.exports = connection;