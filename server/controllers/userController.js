const UserModel = require('../models/userModel');

exports.getAllUser = async (req, res) => {
  try {
    const user = await UserModel.find({});

    res.status(200).json({
      status: 'success',
      length: user.length,
      data: { user },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { user: newUser },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const newUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { user: newUser },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'error: update user, invalid data sent 🤷‍♂️',
    });
  }
};
