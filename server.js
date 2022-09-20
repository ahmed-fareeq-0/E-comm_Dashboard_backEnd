const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors")

app.use(express.json())
app.use(cors())

// connect DB
require('./db/config');
// user Schema
const User = require('./db/User');

// طلب جلب البيانات من العميل
app.post('/register', (req, resp) => {
    const user = new User(req.body)
    const result = user.save()
    resp.send(result)
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))