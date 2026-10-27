const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userEmail: {
    type: String,
  },
  tmdbId: {
    type: Number,
  },
  type: {
    type: String,
  }
});

const Favoris = module.exports = mongoose.model('Favoris', favoriteSchema);

module.exports = Favoris;
