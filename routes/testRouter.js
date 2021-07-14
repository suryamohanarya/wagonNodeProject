const express = require('express')
const router = express.Router()
let testController = require('../controller/testController')


let TestController = new testController()

router.post('/add-product' ,  TestController.addProduct)

router.get('/list-product' , TestController.listProduct)

router.get('/individual-product-fetch/:id' , TestController.individualProduct)

router.put('/update-product/:id' , TestController.updateProduct)

router.delete('/delete-product/:id' , TestController.deleteProduct)


module.exports = router