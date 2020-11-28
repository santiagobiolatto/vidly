const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true,
  },
});

//The name in the parameters add an "S" in the end
//and convert in the name of the collection
const Genre = mongoose.model("Genre", genreSchema);

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
