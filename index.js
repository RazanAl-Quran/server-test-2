const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors()); //install the package

const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send('server is alive')
})

app.listen(PORT, ()=> console.log(`Running on Port ${PORT}`))
