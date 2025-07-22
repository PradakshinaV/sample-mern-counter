const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Counter = require('./models/Counter');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
});

app.get('/counter', async (req, res) => {
  let counter = await Counter.findOne();
  if (!counter) {
    counter = await Counter.create({ value: 0 });
  }
  res.json(counter);
});

app.post('/counter/increment', async (req, res) => {
  let counter = await Counter.findOne();
  counter.value += 1;
  await counter.save();
  res.json(counter);
});

app.post('/counter/decrement', async (req, res) => {
  let counter = await Counter.findOne();
  counter.value -= 1;
  await counter.save();
  res.json(counter);
});

app.post('/counter/reset', async (req, res) => {
  let counter = await Counter.findOne();
  counter.value = 0;
  await counter.save();
  res.json(counter);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
