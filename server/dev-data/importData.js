const fs = require('fs');
const mongoose = require('mongoose');
const ItemModel = require('../models/itemModel');
const UserModel = require('../models/userModel');

mongoose
  .connect('mongodb://localhost:27017/trade-now', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    //console.log(con.connection);
    console.log('DB connection successful');
    console.log('Importing data...');
  })
  .catch((err) => {
    console.log(err.message);
  });

const itemData = JSON.parse(
  fs.readFileSync(`${__dirname}/items.json`, 'utf-8')
);
const userData = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
);

const importData = async () => {
  await UserModel.create(userData);
  await ItemModel.create(itemData);

  const items = await ItemModel.find({});
  const users = await UserModel.find({});

  const itemPerUser = Math.trunc(items.length / users.length);
  let itemCounter = 0;

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < itemPerUser; j++) {
      const userId = users[i]._id;
      const itemId = items[itemCounter]._id;

      const user = await UserModel.findById(userId);
      const list = user.listing;

      const newUser = await UserModel.findByIdAndUpdate(
        userId,
        { listing: [...list, itemId] },
        { new: true }
      );

      await ItemModel.findByIdAndUpdate(itemId, { seller_id: userId });

      itemCounter++;
    }
  }

  while (itemCounter < items.length) {
    const user = await UserModel.findById(users[users.length - 1]._id);

    const userId = user._id;
    const list = user.listing;

    const itemId = items[itemCounter]._id;

    await UserModel.findByIdAndUpdate(userId, { listing: [...list, itemId] });
    await ItemModel.findByIdAndUpdate(itemId, { seller_id: userId });

    itemCounter++;
  }

  mongoose.connection.close();
  console.log('Data imported.');
};

importData();
