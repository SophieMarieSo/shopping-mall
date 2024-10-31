const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes');
const cors = require('cors');
const app = express();

require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // req.body가 객체로 인식된다

const corsOptions = {
  origin: 'http://localhost:3000', // 허용할 클라이언트 URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 허용할 HTTP 메서드
  allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
};

app.use(cors(corsOptions));
app.use('/api', indexRouter);

const mongoURI = process.env.MONGODB_URI_PROD;
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('mongoose connected'))
  .catch((error) => console.log('DB connection failed', error));

app.listen(process.env.PORT || 5000, () => console.log('Server on 5000'));
