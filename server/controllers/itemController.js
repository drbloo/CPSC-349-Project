const ItemModel = require('../models/itemModel');

exports.getAllItem = async (req, res) => {
  try {
    const item = await ItemModel.find(req.query);

    res.status(200).json({
      status: 'success',
      length: item.length,
      data: { item },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await ItemModel.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { item },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
