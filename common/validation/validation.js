const { Validator } = require('node-input-validator')

class validation {

    add_product_validation = (obj) => {
        return new Promise((resolve, reject) => {
            const validate = new Validator(obj, {
                productName    : 'required|string',
                description    : 'required|string'
            })    

            validate.check().then((matched) => {
                if (!matched) {
                    resolve(validate.errors)
                } else {
                    resolve(matched) 
                }
            })
        })
    }
}


module.exports = {
    validation : validation
}
