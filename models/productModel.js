const mongoose = require('mongoose'),
    Schema     = mongoose.Schema;

const productSchema = new mongoose.Schema({
    productName  : {
        type: String,
        trim: true,
        lowercase : true
    },
    description  : {
        type: String,
        trim: true
    }
},    
{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})


module.exports = mongoose.model('new_products' , productSchema)