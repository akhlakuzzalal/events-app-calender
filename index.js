require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const Event = require('./Scema/EventSchema');

// INITIALIZE EXPRESS APP
const app = express();

// PORT
const PORT = process.env.PORT || 5000;

// MIDDLEWARES
app.use(express.json());
app.use(cors());

//connetion URI of mongodb
const uri = process.env.MONGODB_URI;

// connect to mongodb database
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    app.post('/addEvent', async (req, res) => {
      const data = req.body;
      const result = await Event.create(data);
      res.json(result);
    });
    app.get('/getEvent', async (req, res) => {
      const { email } = req.query;
      const result = await Event.find({ email });
      res.json(result);
    });
    app.delete('/deleteEvent/:id', async (req, res) => {
      const id = req.params.id;
      const result = await Event.findByIdAndDelete(id);
      res.json(result);
    });
  } catch (error) {
    console.log(error.message);
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('welcome to events app [A events making website]');
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
