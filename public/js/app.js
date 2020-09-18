
let btn = document.querySelectorAll("button");
let getSession = document.cookie

console.log(getSession)

btn.forEach( (el) => {
    el.addEventListener("click", (e) => {
        // console.log("i am clicked")
        //get parent
        let productName = e.target.parentElement.children[1].innerText;
        addProduct(productName);
    })
});



function addProduct(x){
  fetch(`http://localhost:3000/addToCart/${x}`)
  .then((response) => response.json())
  .then((value) => updateCart(JSON.stringify(value)))
}


function updateCart (x) {
    let items = JSON.parse(x);

    document.querySelector(".totalItmes").textContent = items.cart.products.length;
}