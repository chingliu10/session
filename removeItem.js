module.exports = function removeItem(request, response, itemRemoved)   {
    console.log(request.session.cart.products)
    console.log("top are items in cart")
    console.log(request.session.cart.products[2])
    let arr = request.session.cart.products;
    console.log(arr)
    for(let x = 0; x < arr.length; x++){
      
        if ( arr[x].name == itemRemoved.trim()){
            arr.splice([1], 1)
            break;
        }
      
    }
    console.log("updated products are")
    console.log(arr)

    response.json({ display  : " item removed"} )
}