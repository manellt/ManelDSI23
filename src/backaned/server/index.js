const express = require('express');
const cors = require('cors');
const openaiRoutes = require('./routes/openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/openai', openaiRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));