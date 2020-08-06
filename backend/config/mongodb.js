var mongoose = require('mongoose');

const uri = process.env.MONGO_DSN || "mongodb://localhost:27017/basketole";

module.exports = () => {
  mongoose.set('useUnifiedTopology', true);
  return mongoose.connect(uri,{useNewUrlParser: true})
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
};