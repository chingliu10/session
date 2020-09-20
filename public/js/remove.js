let removeItem = document.querySelectorAll(".removeItem")
let cartN = document.querySelector(".totalItmes")

removeItem.forEach(function (el) {
    el.addEventListener("click", function() {
        this.parentElement.parentElement.remove()
        let productName = this.parentElement.parentElement.children[1].textContent
        let newCartN = Number(cartN.textContent) - 1
        cartN.textContent = newCartN;
        removeFRomCart(productName)
    })
})


function removeFRomCart(x){

    fetch(`/removeItem/${x}`, { method : "post" })
    .then((response) => response.json())
    .then((value) => console.log(value))

}

