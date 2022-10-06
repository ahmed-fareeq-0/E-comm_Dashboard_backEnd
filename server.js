const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(express.json())
app.use(cors())

// connect DB
require('./db/config');
// user Schema
const User = require('./db/User');
// prodyuct Schema
const PrdouctsSchema = require('./db/products');


// register and take info user
app.post('/register', async (req, resp) => {
    const user = new User(req.body)
    const result = await user.save()
    resp.send(result)
})

// login 
app.post('/login', async (req,resp) => {
    
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select('-password');
        if(user){
            resp.send(user)
        }else{
            resp.send({result: 'no user found'})
        }
    }else{
        resp.send({result: 'no  pass or email'})
    }
})

// add products
app.post('/add-product', async (req, resp) => {
    const product = new PrdouctsSchema(req.body);
    const result = await product.save();
    resp.send(result)

})

// send product from back-end to front-end
app.get('/products', async (req,resp) => {
    let products = await PrdouctsSchema.find();
    if(products.length > 0){
        resp.send(products)
    }else{
        resp.send({result: 'no products found'})
    }
})

// delete product
app.delete('/product/:id', async (req,resp) => {
    const result = await PrdouctsSchema.deleteOne({_id:req.params.id})
    resp.send(result)
})

// update product
app.get('/product/:id', async (req,resp) => {
    let result = await PrdouctsSchema.findOne({_id:req.params.id})
    if(result){
        resp.send(result)
    }else{
        resp.send({result:'no r found'})
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))