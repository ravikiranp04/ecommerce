const exp = require('express')
const userApp = exp.Router()
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {verifyToken}=require('../Middlewares/verifyToken')
// Middleware to set up collections
let usersCollection;
let productsCollection;
let cartCollection;
userApp.use((req, res, next) => {
    usersCollection = req.app.get('usersObj');
    productsCollection=req.app.get('productsObj')
    cartCollection = req.app.get('cartWishSave')
    next();
});
//body parser
userApp.use(exp.json())
//Register

userApp.post('/register',async(req,res)=>{
   const userobj = req.body;
   console.log(userobj)
   const db1= await usersCollection.findOne({username:userobj.username});
   const db2= await usersCollection.findOne({email:userobj.email});
   const db3= await usersCollection.findOne({mobileNo:userobj.mobileNo});
   console.log(db1)
   console.log(db2)
   console.log(db3)
   if(db1==null && db2==null && db3==null){
    const hashedPassword=await bcryptjs.hash(userobj.password,7)
    //replace with hash password
    userobj.password=hashedPassword;
    const updated = await usersCollection.insertOne(userobj);
    const cartobj={}
    cartobj.username=userobj.username;
    cartobj.cartItems=[];
    cartobj.wishList=[];
    cartobj.saveForLater=[];
    console.log(cartobj)
    await cartCollection.insertOne(cartobj);

    res.send({message:"User Registered"})
   }
   else if(db1!=null){
        res.send({message:"Username exists"});
   }
   else if(db2!=null){
    res.send({message:"Email already exists"});
   }
   else{
    res.send({message:"Mobile Number already exists"})
   }
})

//Login--------------------------------------------
userApp.post('/login',async(req,res)=>{
    //get user
    const userCred=req.body
    //verify username of user
    let dbuser=await usersCollection.findOne({username:userCred.username})
    if(dbuser==null){
        return res.send({message:"Invalid username"})
    }
    else{
        let status= await bcryptjs.compare(userCred.password,dbuser.password)//return bool value
        if(status==false){
            return res.send({message:"Invalid password"})
        }
        else{
            //create jwt token
            const signedtoken=jwt.sign({username:dbuser.username},'abcde',{expiresIn:'1d'})
            delete dbuser.password
            //console.log('login')
            res.send({message:"Login success",token:signedtoken,user:dbuser})
        }
    }

})

// Add a product to Cart
userApp.put('/add-to-cart/:username/:productid/:qty',verifyToken, async(req,res)=>{
    const prdid=(+req.params.productid);
    const qty= (+req.params.qty);
    const uname = req.params.username
    console.log(uname,prdid," ",qty)
    const productobj = await productsCollection.findOne({productid:prdid});
    console.log(productobj)
    const userobj = await cartCollection.findOne({username:uname}) ;
    //console.log(userobj)
   const prodIndex = userobj.cartItems.findIndex(product=>product.productid === prdid)
    //console.log(prodIndex)
    if(prodIndex==-1){
        console.log(1);
        productobj.quantity = qty;
        userobj.cartItems.push(productobj);
    }
    else{
        console.log(2)
        userobj.cartItems[prodIndex].quantity+=qty;
    }

    const updated = await cartCollection.findOneAndUpdate({username:uname},{$set:{cartItems:userobj.cartItems}},{returnOriginal:false})
    if(updated){
        res.send({message:"product added to cart"});
    }
    else{
        res.send({message:"product not added"})
    }
})

//increase a cart item quantity
userApp.put('/increase-cart-count/:username/:productid', verifyToken,async(req,res)=>{
    const prdid= +req.params.productid;
    const uname = req.params.username
    //console.log(uname,prdid," ",qty)
    const productobj = await productsCollection.findOne({productid:prdid});
    //console.log(productobj)
    const userobj = await cartCollection.findOne({username:uname}) ;
    console.log(userobj)
   const prodIndex = userobj.cartItems.findIndex(product=>product.productid === prdid)
    console.log(prodIndex)
    
    userobj.cartItems[prodIndex].quantity+=1;

    const updated = await cartCollection.findOneAndUpdate({username:uname},{$set:{cartItems:userobj.cartItems}},{returnOriginal:false})
    if(updated){
        res.send({message:"product quantity increased"});
    }
    else{
        res.send({message:"product not added"})
    }
})

//decrease a cart item quantity
userApp.put('/decrease-cart-count/:username/:productid',verifyToken, async(req,res)=>{
    const prdid= +req.params.productid;
    const uname = req.params.username
    //console.log(uname,prdid," ",qty)
    const productobj = await productsCollection.findOne({productid:prdid});
    //console.log(productobj)
    const userobj = await cartCollection.findOne({username:uname}) ;
    //console.log(userobj)
   const prodIndex = userobj.cartItems.findIndex(product=>product.productid === prdid)
    console.log(prodIndex)
    if(userobj.cartItems[prodIndex].quantity==1){
        userobj.cartItems.splice(prodIndex,1);
    }
    else{
        userobj.cartItems[prodIndex].quantity-=1;
    }
    
    const updated = await cartCollection.findOneAndUpdate({username:uname},{$set:{cartItems:userobj.cartItems}},{returnOriginal:false})
    if(updated){
        res.send({message:"product quantity Decreased"});
    }
    else{
        res.send({message:"product not added"})
    }
})

//Remove product  from cart
userApp.put('/remove-cart/:username/:productid', async(req,res)=>{
    const prdid= +req.params.productid;
    const uname = req.params.username
    //console.log(uname,prdid," ",qty)
    const productobj = await productsCollection.findOne({productid:prdid});
    //console.log(productobj)
    const userobj = await cartCollection.findOne({username:uname}) ;
    //console.log(userobj)
   const prodIndex = userobj.cartItems.findIndex(product=>product.productid === prdid)
    //console.log(prodIndex)
    userobj.cartItems.splice(prodIndex,1);

    const updated = await cartCollection.findOneAndUpdate({username:uname},{$set:{cartItems:userobj.cartItems}},{returnOriginal:false})
    if(updated){
        res.send({message:"product removed from cart",payload:userobj.cartItems});
    }
    else{
        res.send({message:"product not removed"})
    }
})

//Display cart items
userApp.get('/display-cart/:username',verifyToken,async(req,res)=>{
    const uname = req.params.username
    const userobj = await cartCollection.findOne({username:uname})
    if(userobj.cartItems.length>0){
        res.send({message:"Cart Items are",payload:userobj.cartItems})
    }
    else{
        res.send({message:"No items"})
    }
})

// Add a product to wishlist
userApp.put('/add-to-wishlist/:username/:productid', async(req,res)=>{
    const prdid= +req.params.productid;
    const uname = req.params.username
    //console.log(uname,prdid," ",qty)
    const productobj = await productsCollection.findOne({productid:prdid});
    console.log(productobj)
    const userobj = await cartCollection.findOne({username:uname}) ;
    console.log(userobj)
   const prodIndex = userobj.wishList.findIndex(product=>product.productid === prdid)
    console.log(prodIndex)
    if(prodIndex==-1){
        userobj.wishList.push(productobj);
    }

    const updated = await cartCollection.findOneAndUpdate({username:uname},{$set:{wishList:userobj.wishList}},{returnOriginal:false})
    if(updated){
        res.send({message:"product added to wishlist"});
    }
    else{
        res.send({message:"product not added"})
    }
})

//Remove product  from wishList
userApp.put('/remove-wishlist/:username/:productid', async(req,res)=>{
    const prdid= +req.params.productid;
    const uname = req.params.username
    //console.log(uname,prdid," ",qty)
    const productobj = await productsCollection.findOne({productid:prdid});
    //console.log(productobj)
    const userobj = await cartCollection.findOne({username:uname}) ;
    //console.log(userobj)
   const prodIndex = userobj.cartItems.findIndex(product=>product.productid === prdid)
    //console.log(prodIndex)
    userobj.wishList.splice(prodIndex,1);

    const updated = await cartCollection.findOneAndUpdate({username:uname},{$set:{wishList:userobj.wishList}},{returnOriginal:false})
    if(updated){
        res.send({message:"product removed from wishList"});
    }
    else{
        res.send({message:"product not removed"})
    }
})

//Display product from wishlist
userApp.get('/display-wishlist/:username',async(req,res)=>{
    const uname = req.params.username
    const userobj = await cartCollection.findOne({username:uname})
    if(userobj.wishList.length>0){
        res.send({message:"WishList Items are",payload:userobj.wishList})
    }
    else{
        res.send({message:"No items"})
    }
})

// Add a product to Save for later
userApp.put('/add-to-savelater/:username/:productid', async(req,res)=>{
    const prdid= req.params.productid;
    const uname = req.params.username
    //console.log(uname,prdid," ",qty)
    const productobj = await productsCollection.findOne({productid:prdid});
    //console.log(productobj)
    const userobj = await cartCollection.findOne({username:uname}) ;
    //console.log(userobj)
   const prodIndex = userobj.saveForLater.findIndex(product=>product.productid === prdid)
    //console.log(prodIndex)
    if(prodIndex==-1){
        userobj.saveForLater.push(productobj);
    }

    const updated = await cartCollection.findOneAndUpdate({username:uname},{$set:{saveForLater:userobj.saveForLater}},{returnOriginal:false})
    if(updated){
        res.send({message:"product added to save for later"});
    }
    else{
        res.send({message:"product not added"})
    }
})

//Remove product  from Save for later
userApp.put('/remove-savelater/:username/:productid', async(req,res)=>{
    const prdid= req.params.productid;
    const uname = req.params.username
    //console.log(uname,prdid," ",qty)
    const productobj = await productsCollection.findOne({productid:prdid});
    //console.log(productobj)
    const userobj = await cartCollection.findOne({username:uname}) ;
    //console.log(userobj)
   const prodIndex = userobj.cartItems.findIndex(product=>product.productid === prdid)
    //console.log(prodIndex)
    userobj.saveForLater.splice(prodIndex,1);

    const updated = await cartCollection.findOneAndUpdate({username:uname},{$set:{saveForLater:userobj.saveForLater}},{returnOriginal:false})
    if(updated){
        res.send({message:"product removed from save For Later"});
    }
    else{
        res.send({message:"product not removed"})
    }
})
//Display product from saveForLater
userApp.get('/display-savelater/:username',async(req,res)=>{
    const uname = req.params.username
    const userobj = await cartCollection.findOne({username:uname})
    if(userobj.saveForLater.length>0){
        res.send({message:"Save For Later Items are",payload:userobj.saveForLater})
    }
    else{
        res.send({message:"No items"})
    }
})

//Display prodcts'
userApp.get('/products',async(req,res)=>{
    const obj = await productsCollection.find({display_status:true}).toArray();
    if(obj.length!=0){
        res.send({message:"Products are",payload:obj});
    }
    else{
        res.send({message:"No Products found"})
    }
})

//Add a product to wishlist
module.exports=userApp