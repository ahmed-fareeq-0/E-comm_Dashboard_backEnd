const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/e-commerce", async (err) => {
	!err? console.log('connect'):console.log(err);
})



