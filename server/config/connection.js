const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/geek-tutor', {
   useNewUrlParser: true
})

module.exports = mongoose.connection