const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const todoRoutes = require('./Routes/todoRoutes');

dotenv.config();

const app = express();

app.use(cors({
  origin : process.env.FRONTEND_URL,
   credentials: true
}));

app.use(express.json());

app.use('/api/todos', todoRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m',"MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log('\x1b[32m%s\x1b[0m',`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("\x1b[1m","Connection failed:", err));
