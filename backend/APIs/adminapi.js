const exp = require('express')
const adminApp = exp.Router()

adminApp.use((req, res, next) => {
    usersCollection = req.app.get('usersObj');
    productsCollection=req.app.get('productsObj')
   
    next();
});
//body parser
adminApp.use(exp.json())


// Add a product
adminApp.post('/add-product',async(req,res)=>{
    const prodObj = req.body;
    const updated = await productsCollection.insertOne(prodObj)
    console.log(updated)
    if(updated){
        res.send({message:"Product added Successfully"});
    }
    else{
        res.send({message:"Cant add product"});
    }
})


//Soft delete a product
adminApp.put('/disable/:prdid',async(req,res)=>{
    const prodid= +req.params.prdid
    console.log(prodid)
    const obj2 = await productsCollection.findOne({productid:prodid})
    const obj = await productsCollection.findOneAndUpdate({productid:prodid},{$set:{display_status:false}},{returnOriginal:false})
    console.log(obj)
    if(obj){
        res.send({message:"Product disabled"})
    }
    else{
        res.send({message:"Try again"})
    }

})

//Enable a disabled product
adminApp.put('/enable/:prdid',async(req,res)=>{
    const prodid= +req.params.prdid
    const obj = await productsCollection.findOneAndUpdate({productid:prodid},{$set:{display_status:true}},{returnOriginal:false})
    console.log(obj)
    if(obj){
        res.send({message:"Product Enabled"})
    }
    else{
        res.send({message:"Try again"})
    }

})


//Change stock
adminApp.put('/change-stock/:prdid/:newstock',async(req,res)=>{
    const prodid= req.params.prdid
    const newstock=+req.params.newstock
    const obj = await productsCollection.findOneAndUpdate({productid:prodid},{$set:{stock:newstock}},{returnOriginal:false})
    console.log(obj)
    if(obj){
        res.send({message:"Stock Updated"})
    }
    else{
        res.send({message:"Try again"})
    }

})

//Display prodcts'
adminApp.get('/products',async(req,res)=>{
    const obj = await productsCollection.find().toArray();
    if(obj.length!=0){
        res.send({message:"Products are",payload:obj});
    }
    else{
        res.send({message:"No Products found"})
    }
})


//Change Discount
adminApp.put('/change-discount/:prdid/:discount',async(req,res)=>{
    const prodid= req.params.prdid
    const discount=+req.params.discount
    const obj = await productsCollection.findOne({productid:prodid})
    obj.discountPercentage = discount;
    obj.priceAfterDiscount = ((100-discount)/100)*obj.price;
    const updt = await productsCollection.findOneAndUpdate({productid:prodid},{$set:{...obj}},{returnOriginal:false})
    console.log(updt)
    if(updt){
        res.send({message:"Discount Updated"})
    }
    else{
        res.send({message:"Try again"})
    }

})


//Modify a product
adminApp.put('/modify-product',async(req,res)=>{
    const obj=req.body;
    const updated = await productsCollection.findOneAndUpdate({productid:obj.productid},{$set:obj},{returnOriginal:false})
    if(updated){
        res.send({message:"Product Modified"})
    }
    else{
        res.send({message:"Product Not modified"})
    }
})
module.exports=adminApp