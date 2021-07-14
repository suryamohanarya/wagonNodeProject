const validation    = require('../common/validation/validation')
const SendResponse  = require('../common/errors/response')
const valid         = new validation.validation();
const productModel     = require('../models/productModel');

class Test {

    addProduct = async (req , res) => {
        try{
            const product_obj = {
                productName   : req.body.productName.toLowerCase(),
                description   : req.body.description,
            }
            await valid.add_product_validation(product_obj).then(async(add_product_validation) => {
                if(add_product_validation == true){

                    // check for product name duplicacy
                    await productModel.findOne({productName : product_obj.productName} , {productName : 1})
                        .then(async(productData) => {
                            if(productData){ // if success
                                const response = SendResponse(400 , true , "Product Name already exist", null)
                                return res.status(response.status).send(response)  
                            }
                            // creating product
                            await productModel.create(product_obj).then(async(data) => {
                                const response = SendResponse(200 , false , "Product created successfully", data)
                                return res.status(response.status).send(response) 
                                
                            }).catch((err) => {
                                const response = SendResponse(400 , true , "Error in product creation", null)
                                return res.status(response.status).send(response) 
                            })
                        }).catch((err) => {
                            const response = SendResponse(400 , true , "Error in product duplicacy check", null)
                            return res.status(response.status).send(response) 
                        })

                }else{
                    const response = SendResponse(400 , true , "Validation Error", add_product_validation)
                    return res.status(response.status).send(response)
                }

            }).catch((err) => {
                const response = SendResponse(400 , true , "Something Went Wrong", null)
                return res.status(response.status).send(response)
            })
        }catch(e){
            console.log(e)
            const response = SendResponse(500 , true , "Internal Server Error", null)
            return res.status(response.status).send(response)
        }
    }

    listProduct = async (req , res) => {
        try{
            await productModel.find()
              .then((product_data) => {
                const response = SendResponse(200 , false , "Product list", product_data)
                return res.status(response.status).send(response)

              }).catch((err) => {
                const response = SendResponse(400 , true , "Error in product list fetch", null)
                return res.status(response.status).send(response)
              })

        }catch(e){
            const response = SendResponse(500 , true , "Internal Server Error", null)
            return res.status(response.status).send(response)
        }
    }

    individualProduct = async (req , res) => {
        try{
            await productModel.findOne({_id : req.params.id})
              .then((product_data) => {
                  if(!product_data){
                    const response = SendResponse(400 , true , "Product not found", null)
                    return res.status(response.status).send(response) 
                  }else{
                    const response = SendResponse(200 , false , "Product data", product_data)
                    return res.status(response.status).send(response)
                  }
              }).catch((err) => {
                const response = SendResponse(400 , true , "Error in product fetch", null)
                return res.status(response.status).send(response)
              })

        }catch(e){
            const response = SendResponse(500 , true , "Internal Server Error", null)
            return res.status(response.status).send(response)
        }
    }

    updateProduct = async (req , res) => {
        try{
            const product_obj = {
                productName   : req.body.productName.toLowerCase(),
                description   : req.body.description,
            }
            await valid.add_product_validation(product_obj).then(async(update_product_validation) => {
                if(update_product_validation == true){

                    // check for product name duplicacy
                    await productModel.findOne({productName : product_obj.productName} , {productName : 1})
                        .then(async(productData) => {
                            console.log(productData , req.params.id)
                            if(productData){ // if success
                                if(productData._id.toString() !== req.params.id.toString()){
                                    const response = SendResponse(400 , true , "Product Name already exist", null)
                                    return res.status(response.status).send(response) 
                                }
                            }
                            // updating product
                            await productModel.updateOne({_id : req.params.id} , {$set : product_obj}).then(async(data) => {
                                const response = SendResponse(200 , false , "Product updated successfully", data)
                                return res.status(response.status).send(response) 
                                
                            }).catch((err) => {
                                const response = SendResponse(400 , true , "Error in product updation", null)
                                return res.status(response.status).send(response) 
                            })
                        }).catch((err) => {
                            const response = SendResponse(400 , true , "Error in product duplicacy check", null)
                            return res.status(response.status).send(response) 
                        })

                }else{
                    const response = SendResponse(400 , true , "Validation Error", update_product_validation)
                    return res.status(response.status).send(response)
                }

            }).catch((err) => {
                const response = SendResponse(400 , true , "Something Went Wrong", null)
                return res.status(response.status).send(response)
            })
        }catch(e){
            console.log(e)
            const response = SendResponse(500 , true , "Internal Server Error", null)
            return res.status(response.status).send(response)
        }
    }

    deleteProduct = async (req , res) => {
        try{
            let id = req.params.id
            await productModel.deleteOne({_id : id})
                .then((delete_prduct) => {
                    const response = SendResponse(200 , false , "Product deleted successfully", null)
                    return res.status(response.status).send(response)
                }).catch((err) => {
                    const response = SendResponse(400 , true , "Product not deleted", null)
                    return res.status(response.status).send(response)
                })
        }catch(e){
            const response = SendResponse(500 , true , "Internal Server Error", null)
            return res.status(response.status).send(response)
        }
    }


}

module.exports = Test
