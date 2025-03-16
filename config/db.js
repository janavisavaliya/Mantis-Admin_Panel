const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://SaurabhKachhadiya:SaurabhKachhadiya@cluster0.7att4.mongodb.net/admin-panel-other`);

const db = mongoose.connection;

db.on('connected', (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`database successfully connected`);
})

module.exports = db;