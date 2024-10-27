const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  foodType: {
    type: String,
    enum: ['canned', 'jarred', 'refrigerated item', 'frozen item', 'fresh vegetable', 'fresh fruit', 'snack item', 'seasoning', 'staple', 'beverage'],
    required: true,
  },
  notes: {
    type: String,
  }
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
