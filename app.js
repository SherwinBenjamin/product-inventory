const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json())
mongoose.connect(
	process.env.DB_URL
).then(() => console.log("connected"));

app.use('/api',productRoutes);


const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server running on port : ${PORT}`));
