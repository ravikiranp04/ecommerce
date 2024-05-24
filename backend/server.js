const exp = require('express');
const app=exp();
const userApp = require('./APIs/userapi')
const adminApp = require('./APIs/adminapi')
const path=require('path')
const cors =require('cors')
require('dotenv').config()
//Assign HTTP req to specifc route
app.use('/user-api',userApp);
app.use('/admin-api',adminApp);

const corsOptions = {
    origin: 'https://ecommerce1-bgef.onrender.com/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
  };
  
  // Use the CORS middleware with the options defined
  app.use(cors(corsOptions));
//bpdy parser
app.use(exp.json());

//------------------------------------------------------------

//
//Replace react build in http web server
app.use(exp.static(path.join(__dirname,'../frontend/build')))


//Connecting Mongo DB server
const mongoClient=require('mongodb').MongoClient;
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //databas obj;
    const commerceDB = client.db('ecommerce');
    // create collection obj
    const usersObj = commerceDB.collection('users')
    const productsObj = commerceDB.collection('products');
    const cartWishSave = commerceDB.collection('cartWishSave');
     //share  colledtions with APIs
    app.set('usersObj',usersObj)
    app.set('productsObj',productsObj)
    app.set('cartWishSave',cartWishSave);

})

// Error Handler
app.use((err, req, res, next) => {
    res.send({ status: "Error", message: err.message });
});

 const port =5100 || process.env.PORT 
//server assign
app.listen(port,()=>{console.log(`server on ${port}`)})