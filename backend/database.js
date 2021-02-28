const mongoose = require('mongoose');

const URI = 'mongodb+srv://arkids21:IpC@_2120@ar-kids.hxmrr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(URI , { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log('Conectamos a base'))
    .catch(err => console.error(err));

module.exports = mongoose;
