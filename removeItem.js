module.exports = function removeItem(request, response, itemRemoved)   {
    
    let arr = request.session.cart.products;
    let price;
    console.log("array is")
    console.log(arr)
    for(let x = 0; x < arr.length; x++){
      
        if ( arr[x].name == itemRemoved.trim()){
            price = arr[x].price
            arr.splice(x, 1)  
            break;
        }
      
    }
    
    request.session.cart.total = request.session.cart.total - price 
    response.json({ total  : price } )
}