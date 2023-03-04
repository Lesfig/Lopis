const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./config/mongoose.config');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'))

const corsConfig = {
    origin: true,
    credentials: true,
  };
  
  app.use(cors(corsConfig));
  app.options('*', cors(corsConfig))

const userRoutes = require('./routes/user.routes');
userRoutes(app);
const articleRoutes = require('./routes/article.routes');
articleRoutes(app);

app.listen(PORT, ()=>{
    console.log(`Server running in ${PORT}`);
})