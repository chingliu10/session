module.exports = function addToCart(product, request, response){
    
        const db = require("./connection")
        let amount = 0;

        db.query(`select * from activesession where session_id = '${request.sessionID}'  `  , function (error, results, fiels){
          if (error) throw error
          //product is the product that has been added from user
          let newProduct = JSON.parse(JSON.stringify(request.session.cart))
          // newProduct[1].products.push(y)
          let arr = newProduct.products.push(product)
          if(newProduct.products.length >= 1){
              newProduct.products.forEach((element) =>{
                amount = amount + element.price 
              })
          }

          newProduct.total = amount
          JSON.stringify(newProduct)
          request.session.cart = newProduct
          response.json({ cart: newProduct})
        })


  
}