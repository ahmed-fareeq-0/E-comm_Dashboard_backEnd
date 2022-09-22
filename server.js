const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors')

app.use(express.json())
app.use(cors())

// connect DB
require('./db/config');
// user Schema
const User = require('./db/User');

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

app.listen(port, () => console.log(`Example app listening on port ${port}`))