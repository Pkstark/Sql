const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
const route = require('./controller/Route');

app.use('/uploads', express.static('./uploads'));
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use('/', route);
app.use(express.json());

app.listen(7000, (console.log("Port listining")));

