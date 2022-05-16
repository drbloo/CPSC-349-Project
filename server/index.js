const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const itemRouter = require('./routes/itemRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

const port = 4020;

//const importData = require('./dev-data/importData');

app.use(cors());
app.use(express.json());
app.use('/items', itemRouter);
app.use('/users', userRouter);

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
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(port, () => {
  console.log(`REST server started on port ${port}...`);
});
