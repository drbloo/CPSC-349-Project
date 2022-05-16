const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An item must have a name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'An item must have a description'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'An item must have a price'],
  },
  image_url: {
    type: String,
    required: [true, 'An item must have a description'],
    trim: true,
  },
  seller_id: {
    type: String,
    required: [true, 'An item must have a seller id'],
  },
  condition: {
    type: String,
    required: [true, 'An item must have a condition'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'An item must have a category'],
    trim: true,
  },
});

const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;
